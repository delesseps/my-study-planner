import {Service, Inject} from 'typedi'
import {IUser} from '../interfaces/IUser'
import IEvaluation from '../interfaces/IEvaluation'
import winston from 'winston'
import {startSession, Document} from 'mongoose'
import {update} from 'lodash'

@Service()
export default class EvaluationService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('evaluationModel') private evaluationModel: Models.EvaluationModel,
    @Inject('courseModel') private CourseModel: Models.CourseModel,
    @Inject('logger') private logger: winston.Logger,
  ) {}

  public async Add(user: IUser, evaluation: IEvaluation): Promise<IEvaluation> {
    const session = await startSession()

    try {
      evaluation.createdBy = {
        _id: user._id,
      }

      if (evaluation.course) {
        const courseRecord = await this.CourseModel.findById(
          evaluation.course,
          'name',
        )

        if (!courseRecord) {
          const err = new Error('Provided course does not exist.')
          err['status'] = 400
          throw err
        }

        if (courseRecord.name !== evaluation.name) {
          const err = new Error('Provided name does not match course name.')
          err['status'] = 400
          throw err
        }

        evaluation.linked = true
      }

      let evaluationRecord: IEvaluation & Document

      const transactionResult: any = await session.withTransaction(async () => {
        evaluationRecord = (
          await this.evaluationModel.create([evaluation], {session})
        )[0]

        evaluationRecord = evaluationRecord.populate({
          path: 'createdBy',
          select: '_id name picture',
        })

        if (evaluation.course) {
          await this.CourseModel.findByIdAndUpdate(
            evaluation.course,
            {
              $push: {evaluations: evaluationRecord._id},
            },
            {session},
          )

          evaluationRecord = evaluationRecord.populate([
            {path: 'createdBy', select: '_id name picture'},
            {path: 'course', select: '_id name'},
          ])
        }

        evaluationRecord = await evaluationRecord.execPopulate()

        await this.userModel.findByIdAndUpdate(
          user._id,
          {
            $push: {evaluations: evaluationRecord._id},
          },
          {session},
        )
      })

      if (!transactionResult) {
        throw new Error('Could not add evaluation')
      }

      return evaluationRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    } finally {
      await session.endSession()
    }
  }

  public async MarkAsDone(
    userId: string,
    evaluationId: string,
  ): Promise<IEvaluation> {
    try {
      const evaluationRecord = await this.evaluationModel
        .findOneAndUpdate(
          {
            createdBy: {_id: userId},
            _id: evaluationId,
          },
          {
            $push: {
              done: userId,
            },
          },
          {new: true},
        )
        .populate([
          {path: 'createdBy', select: '_id name picture'},
          {path: 'course', select: '_id name'},
        ])

      if (!evaluationRecord) {
        throw new Error('Could not mark evaluation as done')
      }

      return evaluationRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  public async Update(
    user: IUser,
    evaluation: IEvaluation,
  ): Promise<IEvaluation> {
    const session = await startSession()

    try {
      let evaluationRecord: IEvaluation & Document

      const transactionResult: any = await session.withTransaction(async () => {
        const evaluationToUpdate = await this.evaluationModel.findOne(
          {
            createdBy: {_id: user._id},
            _id: evaluation._id,
          },
          null,
          {session},
        )

        if (evaluationToUpdate.linked && evaluation.course) {
          await session.abortTransaction()
          const err = new Error(
            'Cannot Link evaluation that has already been linked.',
          )
          err['status'] = 400
          throw err
        }

        let updateObject: Record<any, any> = {
          name: evaluation.name,
          evaluationType: evaluation.evaluationType,
          date: evaluation.date,
          urgency: evaluation.urgency,
          description: evaluation.description,
        }

        if (!evaluationToUpdate.linked && evaluation.course) {
          updateObject = {
            name: evaluation.name,
            evaluationType: evaluation.evaluationType,
            date: evaluation.date,
            urgency: evaluation.urgency,
            description: evaluation.description,
            course: evaluation.course,
            linked: true,
          }

          await this.CourseModel.findByIdAndUpdate(
            evaluation.course,
            {
              $push: {evaluations: evaluationToUpdate._id},
            },
            {session},
          )
        }

        evaluationRecord = await this.evaluationModel
          .findOneAndUpdate(
            {
              createdBy: {_id: user._id},
              _id: evaluation._id,
            },
            {
              $set: updateObject,
            },
            {new: true, session},
          )
          .populate([
            {path: 'createdBy', select: '_id name picture'},
            {path: 'course', select: '_id name'},
          ])
      })

      if (!transactionResult) {
        throw new Error('Could not update evaluation')
      }

      return evaluationRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    } finally {
      await session.endSession()
    }
  }

  public async Delete(
    userId: string,
    evaluationId: string,
  ): Promise<IEvaluation> {
    const session = await startSession()

    try {
      let deletedRecord: IEvaluation & Document

      const transactionResult: any = await session.withTransaction(async () => {
        deletedRecord = await this.evaluationModel.findOneAndRemove(
          {
            _id: evaluationId,
            createdBy: {_id: userId},
          },
          {session},
        )

        await this.userModel.findByIdAndUpdate(
          userId,
          {
            // @ts-ignore
            $pull: {evaluations: evaluationId},
          },
          {session},
        )
      })

      if (!transactionResult) {
        throw new Error('Could not delete evaluation')
      }

      return deletedRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    } finally {
      await session.endSession()
    }
  }
}
