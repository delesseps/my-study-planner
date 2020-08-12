import {Urgency} from './IUser'

export default interface IToDo {
  _id: string
  task: string
  urgency: Urgency
  done: boolean
}
