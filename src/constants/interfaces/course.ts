import IEvaluation from './IEvaluation'
import IHomework from './IHomework'
import IUser from './IUser'

export enum Weekdays {
  sunday = 'SUNDAY',
  monday = 'MONDAY',
  tuesday = 'TUESDAY',
  wednesday = 'WEDNESDAY',
  thursday = 'THURSDAY',
  friday = 'FRIDAY',
  saturday = 'SATURDAY',
}

export type ISchedule = {
  [key in Weekdays]?: {
    start: number
    end: number
    classroom: string
  }
}

export interface ICourse {
  _id: string
  name: string
  schedule: ISchedule
  evaluations: IEvaluation[]
  homework: IHomework[]
  members: Partial<IUser>[]
  createdBy: Partial<IUser>
}
