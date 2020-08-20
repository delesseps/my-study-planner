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

      console.log(homework)
      let homeworkRecord: IHomework & Document

      await session.withTransaction(async () => {
        homeworkRecord = await (
          await this.HomeworkModel.create([homework], {session})
        )[0]
          .populate({path: 'createdBy', select: '_id name picture'})
          .execPopulate()

        await this.userModel.findByIdAndUpdate(
          user._id,
          {
            $push: {homework: homeworkRecord._id},
          },
          {session},
        )

        if (homework.courseId) {
          await this.CourseModel.findByIdAndUpdate(homework.courseId, {
            $push: {homework: homeworkRecord._id},
          })
        }
      })

      if (!homeworkRecord) {
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
      ).populate({path: 'createdBy', select: '_id name picture'})

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
    try {
      const homeworkRecord = await this.HomeworkModel.findOneAndUpdate(
        {
          createdBy: {_id: user._id},
          _id: homework._id,
        },
        {
          $set: {
            subject: homework.subject,
            date: homework.date,
            urgency: homework.urgency,
            description: homework.description,
          },
        },
        {new: true},
      ).populate({path: 'createdBy', select: '_id name picture'})

      if (!homeworkRecord) {
        throw new Error('Could not update homework')
      }

      return homeworkRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  public async Delete(userId: string, homeworkId: string): Promise<IHomework> {
    try {
      const deletedRecord = await this.HomeworkModel.findOneAndRemove({
        _id: homeworkId,
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
