enum Urgency {
  important = "IMPORTANT",
  moderate = "MODERATE",
  chill = "CHILL"
}

interface IUser {
  name: string;
  email: string;
  evaluations: {
    subject: String;
    evaluationType: String;
    date: Date;
    urgency: Urgency;
    description: String;
    done: boolean;
  }[];
  todos: { task: String; urgency: Urgency; done: boolean }[];
  homework: {
    subject: String;
    dueDate: Date;
    urgency: Urgency;
    description: String;
    done: Boolean;
  }[];
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
