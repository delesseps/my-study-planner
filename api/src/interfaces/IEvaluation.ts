import {Urgency, IUser} from './IUser'
import {ICourse} from '.'

export default interface IEvaluation {
  _id: string
  name: string
  evaluationType: string
  date: Date
  urgency: Urgency
  description: string
  done: string[]
  createdBy: Partial<IUser>
  linked: boolean
  course: ICourse
}
