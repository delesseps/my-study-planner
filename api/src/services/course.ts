import {Service, Inject} from 'typedi'
import {IUser} from '../interfaces/IUser'
import {ICourse, ActivityType, IActivity} from '../interfaces'
import evaluation from '../api/routes/evaluation'
import {startSession, Document} from 'mongoose'

@Service()
export default class CourseService {
  constructor(
    @Inject('courseModel') private courseModel: Models.CourseModel,
    @Inject('activityModel') private activityModel: Models.ActivityModel,
  ) {}

  public async get(user: IUser): Promise<ICourse[]> {
    try {
      const courseRecords = await this.courseModel
        // @ts-ignore
        .find({members: user._id})
        .select('name schedule members homework evaluations createdBy')

      if (!courseRecords) {
        throw new Error("Cannot get user's courses")
      }

      return courseRecords
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  public async getById(userId: string, id: string): Promise<ICourse> {
    try {
      const courseRecord = await this.courseModel
        // @ts-ignore
        .findOne({_id: id, members: userId})
        .select('name schedule members homework evaluations createdBy')
        .populate([
          {path: 'members', select: '_id name picture'},
          'evaluations',
          'homework',
        ])

      if (!courseRecord) {
        throw new Error('Cannot get course')
      }

      return courseRecord
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  public async Add(user: IUser, course: ICourse): Promise<ICourse> {
    const session = await startSession()

    try {
      let courseRecord: ICourse & Document

      const transactionResult: any = await session.withTransaction(async () => {
        const activity: IActivity = {
          type: ActivityType.createCourse,
          actor: {_id: user._id},
        }

        const activityRecord = (
          await this.activityModel.create([activity], {
            session,
          })
        )[0]

        course.createdBy = {
          _id: user._id,
          name: user.name,
          picture: user.picture,
        }
        course.members = [course.createdBy]
        course.activity = [activityRecord]

        courseRecord = (await this.courseModel.create([course], {session}))[0]
      })

      if (!transactionResult) {
        throw new Error('Course cannot be created')
      }

      // @ts-ignore
      courseRecord.createdAt = undefined
      // @ts-ignore
      courseRecord.updatedAt = undefined
      courseRecord.__v = undefined

      return courseRecord
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      await session.endSession()
    }
  }

  public async Update(user: IUser, course: ICourse): Promise<ICourse> {
    try {
      Reflect.deleteProperty(course, 'createdBy')
      Reflect.deleteProperty(course, 'members')

      const response = await this.courseModel
        .findOneAndUpdate(
          {
            _id: course._id,
            // @ts-ignore
            members: user._id,
          },
          course,
          {new: true},
        )
        .select('name schedule members homework evaluations createdBy')

      if (!response) {
        throw new Error('Could not update evaluation')
      }

      return response
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  public async Delete(
    userId: string,
    courseId: string,
  ): Promise<
    {
      ok?: number
      n?: number
    } & {
      deletedCount?: number
    }
  > {
    try {
      const response = await this.courseModel.deleteOne({
        _id: courseId,
        // @ts-ignore
        members: userId,
      })

      if (!response) {
        throw new Error('Could not delete evaluation')
      }

      return response
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
