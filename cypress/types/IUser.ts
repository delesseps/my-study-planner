import IHomework from './IHomework'
import IToDo from './IToDo'
import IEvaluation from './IEvaluation'

export enum Urgency {
  important = 'important',
  normal = 'normal',
  chill = 'chill',
}

export interface IUserConfig {
  darkMode: boolean
  [key: string]: boolean
}

export default interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: string
  firstSignIn: boolean
  fcm: boolean
  picture: string
  verified: boolean
  evaluations: IEvaluation[]
  toDos: IToDo[]
  homework: IHomework[]
  configuration: IUserConfig
  semesters: {
    _id: String
    grades: {
      subject: String
      literalGrade: String
      grade: number
      credits: number
    }[]
  }[]
}
