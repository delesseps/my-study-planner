import {Urgency} from './IUser'

export default interface IHomework {
  _id: string
  subject: string
  date: string
  urgency: Urgency
  description: string
  done: string[]
  createdBy: {
    _id: string
    name: string
    picture: string
  }
}
