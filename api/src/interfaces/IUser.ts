import {IEvaluation, IToDo, IHomework} from '.'

export enum Urgency {
  important = 'important',
  moderate = 'normal',
  chill = 'chill',
}
export interface IUserConfig {
  darkMode: boolean
}

export interface IUser {
  _id?: string
  name: string
  email: string
  verified?: boolean
  verificationToken?: string
  role?: string
  fcm?: boolean
  firstSignIn?: boolean
  picture?: string
  password?: string
  googleId?: string
  registrationToken?: string
  configuration?: IUserConfig
  evaluations?: IEvaluation[]
  toDos?: IToDo[]
  homework?: IHomework[]
  semesters?: {
    _id: string
    grades: {
      subject: string
      literalGrade: string
      grade: number
      credits: number
    }[]
  }[]
}

export interface IUserInputDTO {
  name: string
  email: string
  password: string
}
