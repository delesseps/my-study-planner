import IHomework from "./IHomework";
import IToDo from "./IToDo";
import IEvaluation from "./IEvaluation";

export enum Urgency {
  important = "IMPORTANT",
  moderate = "MODERATE",
  chill = "CHILL"
}

export default interface IUser {
  name: string;
  email: string;
  role: string;
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
