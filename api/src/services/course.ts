import {Service, Inject} from 'typedi'
import {IUser} from '../interfaces/IUser'
import {ICourse} from '../interfaces'

@Service()
export default class CourseService {
  constructor(@Inject('courseModel') private courseModel: Models.CourseModel) {}

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
        .populate({path: 'members', select: '_id name picture'})

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
    try {
      course.createdBy = {
        _id: user._id,
        name: user.name,
        picture: user.picture,
      }
      course.members = [course.createdBy]

      const courseRecord = await this.courseModel.create(course)

      if (!courseRecord) {
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
