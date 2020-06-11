import {Urgency, IUser} from './IUser'

export default interface IEvaluation {
  _id: string
  subject: string
  evaluationType: string
  date: Date
  urgency: Urgency
  description: string
  done: string[]
  createdBy: Partial<IUser>
}
