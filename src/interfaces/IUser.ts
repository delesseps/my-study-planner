import IHomework from "./IHomework";
import IToDo from "./IToDo";
import IEvaluation from "./IEvaluation";

export enum Urgency {
  important = "important",
  normal = "normal",
  chill = "chill"
}

export default interface IUser {
  name: string;
  email: string;
  role: string;
  picture: string;
  evaluations: IEvaluation[];
  todos: IToDo[];
  homework: IHomework[];
  semesters: {
    _id: String;
    grades: {
      subject: String;
      literalGrade: String;
      grade: number;
      credits: number;
    }[];
  }[];
}
