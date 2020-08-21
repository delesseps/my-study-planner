import {Urgency} from './IUser'
import {ICourse} from './course'

export default interface IHomework {
  _id: string
  name: string
  date: string
  urgency: Urgency
  description: string
  done: string[]
  course: {
    details?: ICourse
    name: string
  }
  createdBy: {
    _id: string
    name: string
    picture: string
  }
}
