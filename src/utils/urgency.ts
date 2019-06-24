import { Urgency } from "interfaces/IUser";

export default function determinePriority(urgency: Urgency) {
  switch (urgency) {
    case "chill":
      return "Low Priority";
    case "normal":
      return "Medium Priority";
    case "important":
      return "High Priority";
    default:
  }
}

export function determineColor(urgency: Urgency) {
  switch (urgency) {
    case "chill":
      return "green";
    case "normal":
      return "yellow";
    case "important":
      return "red";
    default:
  }
}
