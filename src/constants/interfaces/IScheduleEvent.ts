import IEvaluation from "./IEvaluation";
import IHomework from "./IHomework";
import { Urgency } from "./IUser";

export default interface IScheduleEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: true;
  type: "evaluation" | "homework";
  urgency: Urgency;
  evaluation?: IEvaluation;
  homework?: IHomework;
}
