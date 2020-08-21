import {Service, Inject} from 'typedi'
import {IUser} from '../interfaces/IUser'
import IEvaluation from '../interfaces/IEvaluation'
import winston from 'winston'
import {startSession, Document} from 'mongoose'

@Service()
export default class EvaluationService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('evaluationModel') private evaluationModel: Models.evaluationModel,
    @Inject('courseModel') private CourseModel: Models.CourseModel,
    @Inject('logger') private logger: winston.Logger,
  ) {}

  public async Add(user: IUser, evaluation: IEvaluation): Promise<IEvaluation> {
    const session = await startSession()

    try {
      evaluation.createdBy = {
        _id: user._id,
      }

      let evaluationRecord: IEvaluation & Document

      await session.withTransaction(async () => {
        evaluationRecord = await (
          await this.evaluationModel.create([evaluation], {session})
        )[0]
          .populate({path: 'createdBy', select: '_id name picture'})
          .execPopulate()

        await this.userModel.findByIdAndUpdate(user._id, {
          $push: {evaluations: evaluationRecord._id},
        })

        if (evaluation.courseId) {
          await this.CourseModel.findByIdAndUpdate(evaluation.courseId, {
            $push: {evaluations: evaluationRecord._id},
          })
        }
      })

      if (!evaluationRecord) {
        throw new Error('Could not add homework')
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
        .populate({path: 'createdBy', select: '_id name picture'})

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
    try {
      const evaluationRecord = await this.evaluationModel
        .findOneAndUpdate(
          {
            createdBy: {_id: user._id},
            _id: evaluation._id,
          },
          {
            $set: {
              subject: evaluation.subject,
              evaluationType: evaluation.evaluationType,
              date: evaluation.date,
              urgency: evaluation.urgency,
              description: evaluation.description,
            },
          },
          {new: true},
        )
        .populate({path: 'createdBy', select: '_id name picture'})

      if (!evaluationRecord) {
        throw new Error('Could not update evaluation')
      }

      return evaluationRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  public async Delete(
    userId: string,
    evaluationId: string,
  ): Promise<IEvaluation> {
    try {
      const deletedRecord = await this.evaluationModel.findOneAndRemove({
        _id: evaluationId,
        createdBy: {_id: userId},
      })

      if (!deletedRecord) {
        throw new Error('Could not delete evaluation')
      }

      return deletedRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}
