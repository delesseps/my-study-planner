import {IUser} from './IUser'
import {IEvaluation, IHomework} from '.'

export enum ActivityType {
  createCourse = 'create_course',
  addHomework = 'add_homework',
  addEvaluation = 'add_evaluation',
  removeHomework = 'remove_homework',
  removeEvaluation = 'remove_evaluation',
}

export interface IActivity {
  type: ActivityType
  objectModel?: 'Evaluation' | 'Homework'
  object?: IEvaluation | IHomework
  actor: Partial<IUser>
}
