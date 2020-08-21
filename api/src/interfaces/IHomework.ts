import {Urgency, IUser} from './IUser'
import {ICourse} from '.'

export default interface IHomework {
  _id: string
  name: string
  date: Date
  urgency: Urgency
  description: string
  done: string[]
  createdBy: Partial<IUser>
  course: {
    details?: ICourse
    name: string
  }
}
