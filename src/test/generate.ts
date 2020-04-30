import faker from "faker";
import IHomework from "constants/interfaces/IHomework";
import IUser, { Urgency } from "constants/interfaces/IUser";
import IEvaluation from "constants/interfaces/IEvaluation";
import { Weekdays, ICourse } from "constants/interfaces";

export function buildUser(overrides?: Record<string, string>): IUser {
  return {
    _id: faker.random.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    picture: faker.image.image(),
    firstSignIn: false,
    fcm: false,
    role: "user",
    verified: false,
    configuration: {
      darkMode: false,
    },
    evaluations: [],
    homework: [],
    toDos: [],
    semesters: [],
    ...overrides,
  };
}

export function buildHomework(overrides?: Record<string, string>): IHomework {
  return {
    _id: faker.random.uuid(),
    subject: faker.name.jobTitle(),
    date: faker.date.recent().toISOString(),
    urgency: Urgency.normal,
    description: faker.name.jobDescriptor(),
    done: false,
    createdBy: {
      _id: faker.random.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      picture: faker.image.image(),
    },
    ...overrides,
  };
}

export function buildEvaluation(
  overrides?: Record<string, string>
): IEvaluation {
  return {
    _id: faker.random.uuid(),
    subject: faker.name.jobTitle(),
    date: faker.date.recent().toISOString(),
    evaluationType: "quiz",
    urgency: Urgency.normal,
    description: faker.name.jobDescriptor(),
    done: false,
    createdBy: {
      _id: faker.random.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      picture: faker.image.image(),
    },
    ...overrides,
  };
}

export function buildCourse(overrides?: Record<string, string>): ICourse {
  const weekdays = Object.values(Weekdays);

  return {
    _id: faker.random.uuid(),
    name: faker.name.jobTitle(),
    schedule: {
      [weekdays[Math.floor(Math.random() * weekdays.length)]]: {
        start: 900,
        end: 1080,
        classroom: "Virtual",
      },
      [weekdays[Math.floor(Math.random() * weekdays.length)]]: {
        start: 1080,
        end: 1200,
        classroom: "FR1-301",
      },
    },
    members: [],
    evaluations: [],
    homework: [],
    createdBy: {
      _id: faker.random.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      picture: faker.image.image(),
    },
    ...overrides,
  };
}
