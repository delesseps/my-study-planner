import {IEvaluation, IHomework, ISchedule, IUser} from '.'
import {IActivity} from './IActivity'

export default interface ICourse {
  _id: string
  name: string
  schedule: ISchedule
  evaluations?: IEvaluation[]
  homework?: IHomework[]
  members: Partial<IUser>[]
  createdBy: Partial<IUser>
  activity: IActivity[]
}
