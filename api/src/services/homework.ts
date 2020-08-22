import {startSession, Document} from 'mongoose'
import {Service, Inject} from 'typedi'
import {IUser} from '../interfaces/IUser'
import IHomework from '../interfaces/IHomework'
import winston from 'winston'

@Service()
export default class HomeworkService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('homeworkModel') private HomeworkModel: Models.HomeworkModel,
    @Inject('courseModel') private CourseModel: Models.CourseModel,
    @Inject('logger') private logger: winston.Logger,
  ) {}

  public async Add(user: IUser, homework: IHomework): Promise<IHomework> {
    const session = await startSession()

    try {
      homework.createdBy = {
        _id: user._id,
      }

      if (homework.course.details) {
        const courseRecord = await this.CourseModel.findById(
          homework.course.details,
          'name',
        )

        if (!courseRecord) {
          const err = new Error('Provided course does not exist.')
          err['status'] = 400
          throw err
        }

        homework.linked = true
      }

      let homeworkRecord: IHomework & Document

      const transactionResult: any = await session.withTransaction(async () => {
        homeworkRecord = (
          await this.HomeworkModel.create([homework], {
            session,
          })
        )[0]

        homeworkRecord = homeworkRecord.populate([
          {path: 'createdBy', select: '_id name picture'},
        ])

        if (homework.course.details) {
          await this.CourseModel.findByIdAndUpdate(
            homework.course.details,
            {
              $push: {homework: homeworkRecord._id},
            },
            {session},
          )

          homeworkRecord = homeworkRecord.populate([
            {path: 'createdBy', select: '_id name picture'},
            {path: 'course.details', select: '_id name'},
          ])
        }

        homeworkRecord = await homeworkRecord.execPopulate()

        await this.userModel.findByIdAndUpdate(
          user._id,
          {
            $push: {homework: homeworkRecord._id},
          },
          {session},
        )
      })

      if (!transactionResult) {
        throw new Error('Could not add homework')
      }

      return homeworkRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    } finally {
      await session.endSession()
    }
  }

  public async MarkAsDone(
    userId: string,
    homeworkId: string,
  ): Promise<IHomework> {
    try {
      const homeworkRecord = await this.HomeworkModel.findOneAndUpdate(
        {
          createdBy: {_id: userId},
          _id: homeworkId,
        },
        {
          $push: {
            done: userId,
          },
        },
        {new: true},
      ).populate([
        {path: 'createdBy', select: '_id name picture'},
        {path: 'course.details', select: '_id name'},
      ])

      if (!homeworkRecord) {
        throw new Error('Could not mark homework as done')
      }

      return homeworkRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  public async Update(user: IUser, homework: IHomework): Promise<IHomework> {
    const session = await startSession()

    try {
      let homeworkRecord: IHomework & Document

      const transactionResult: any = await session.withTransaction(async () => {
        const homeworkToUpdate = await this.HomeworkModel.findOne(
          {
            createdBy: {_id: user._id},
            _id: homework._id,
          },
          null,
          {session},
        )

        if (homeworkToUpdate.linked && homework.course.details) {
          await session.abortTransaction()
          const err = new Error(
            'Cannot Link homework that has already been linked.',
          )
          err['status'] = 400
          throw err
        }

        let updateObject: Record<any, any> = {
          name: homework.name,
          date: homework.date,
          urgency: homework.urgency,
          description: homework.description,
          course: {
            name: homework.course.name,
          },
        }

        if (!homeworkToUpdate.linked && homework.course.details) {
          updateObject = {
            name: homework.name,
            date: homework.date,
            urgency: homework.urgency,
            description: homework.description,
            linked: true,
            course: {
              details: homework.course.details,
              name: homework.course.name,
            },
          }

          await this.CourseModel.findByIdAndUpdate(
            homework.course.details,
            {
              $push: {homework: homeworkToUpdate._id},
            },
            {session},
          )
        }

        homeworkRecord = await this.HomeworkModel.findOneAndUpdate(
          {
            createdBy: {_id: user._id},
            _id: homework._id,
          },
          {
            $set: updateObject,
          },
          {new: true, session},
        ).populate([
          {path: 'createdBy', select: '_id name picture'},
          {path: 'course.details', select: '_id name'},
        ])
      })

      if (!transactionResult) {
        throw new Error('Could not update homework')
      }

      return homeworkRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    } finally {
      await session.endSession()
    }
  }

  public async Delete(userId: string, homeworkId: string): Promise<IHomework> {
    const session = await startSession()

    try {
      let deletedRecord: IHomework & Document

      const transactionResult: any = await session.withTransaction(async () => {
        deletedRecord = await this.HomeworkModel.findOneAndRemove(
          {
            _id: homeworkId,
            createdBy: {_id: userId},
          },
          {session},
        )

        await this.userModel.findByIdAndUpdate(
          userId,
          {
            // @ts-ignore
            $pull: {homework: homeworkId},
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
