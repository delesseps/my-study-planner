import {Urgency, IUser} from './IUser'

export default interface IHomework {
  _id: string
  subject: string
  date: Date
  urgency: Urgency
  description: string
  done: string[]
  createdBy: Partial<IUser>
  courseId: string
}
