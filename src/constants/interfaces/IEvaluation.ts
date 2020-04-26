import { Urgency } from "./IUser";
import { Moment } from "moment";

export default interface IEvaluation {
  _id: string;
  subject: string;
  evaluationType: string;
  date: string;
  urgency: Urgency;
  description: string;
  done: boolean;
  createdBy: {
    _id: string;
    name: string;
    picture: string;
  };
}
