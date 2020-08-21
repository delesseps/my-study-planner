import {Urgency} from './IUser'

export default interface IEvaluation {
  _id: string
  subject: string
  evaluationType: string
  date: string
  urgency: Urgency
  description: string
  done: string[]
  courseId: string
  createdBy: {
    _id: string
    name: string
    picture: string
  }
}
