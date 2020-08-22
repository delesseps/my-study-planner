import {Urgency} from './IUser'
import {ICourse} from '.'

export default interface IEvaluation {
  _id: string
  name: string
  evaluationType: string
  date: string
  urgency: Urgency
  description: string
  done: string[]
  course: ICourse
  linked: boolean
  createdBy: {
    _id: string
    name: string
    picture: string
  }
}
