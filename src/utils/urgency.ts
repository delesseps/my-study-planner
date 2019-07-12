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

export function determinePriorityNumber(urgency: Urgency) {
  switch (urgency) {
    case "chill":
      return 1;
    case "normal":
      return 2;
    case "important":
      return 3;
    default:
      return 0;
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
