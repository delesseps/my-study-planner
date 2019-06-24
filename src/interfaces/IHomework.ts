import { Urgency } from "./IUser";
import { Moment } from "moment";

export default interface IHomework {
  _id: string;
  subject: string;
  date: string;
  urgency: Urgency;
  description: string;
  done: Boolean;
  createdBy: {
    _id: string;
    name: string;
    picture: string;
  };
}
