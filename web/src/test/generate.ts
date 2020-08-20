import faker from 'faker'
import IHomework from 'constants/interfaces/IHomework'
import IUser, {Urgency} from 'constants/interfaces/IUser'
import IEvaluation from 'constants/interfaces/IEvaluation'
import {Weekdays, ICourse} from 'constants/interfaces'
import IToDo from 'constants/interfaces/IToDo'

export function buildUser(overrides?: Record<string, any>): IUser {
  return {
    _id: faker.random.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    picture: faker.image.image(),
    firstSignIn: false,
    fcm: false,
    role: 'user',
    verified: false,
    configuration: {
      darkMode: false,
    },
    evaluations: [],
    homework: [],
    toDos: [],
    semesters: [],
    ...overrides,
  }
}

export function buildHomework(overrides?: Record<string, any>): IHomework {
  return {
    _id: faker.random.uuid(),
    subject: faker.name.jobTitle(),
    date: new Date().toISOString(),
    urgency: Urgency.normal,
    description: faker.name.jobDescriptor(),
    done: [],
    courseId: '',
    createdBy: {
      _id: faker.random.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      picture: faker.image.image(),
    },
    ...overrides,
  }
}

export function buildEvaluation(
  overrides?: Record<string, string>,
): IEvaluation {
  return {
    _id: faker.random.uuid(),
    subject: faker.name.jobTitle(),
    date: new Date().toISOString(),
    evaluationType: 'quiz',
    urgency: Urgency.normal,
    description: faker.name.jobDescriptor(),
    done: [],
    createdBy: {
      _id: faker.random.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      picture: faker.image.image(),
    },
    ...overrides,
  }
}

export function buildToDo(overrides?: Record<string, any>): IToDo {
  return {
    _id: faker.random.uuid(),
    task: faker.name.jobType(),
    urgency: Urgency.normal,
    done: false,
    ...overrides,
  }
}

function getRandomWeekday({exclude}: {exclude?: string} = {}): Weekdays {
  const weekdays = Object.values(Weekdays)
  const index = Math.floor(Math.random() * (weekdays.length - 1))
  const weekday = weekdays[index]

  // Avoid collision of random values
  if (weekday === exclude) return getRandomWeekday({exclude})

  return weekday
}

export function buildCourse(overrides?: Record<string, any>): ICourse {
  const firstDay = getRandomWeekday()
  const secondDay = getRandomWeekday({exclude: firstDay})

  return {
    _id: faker.random.uuid(),
    name: faker.name.jobTitle(),
    schedule: {
      [firstDay]: {
        start: 54000,
        end: 64800,
        classroom: faker.lorem.word(),
      },
      [secondDay]: {
        start: 64800,
        end: 72000,
        classroom: faker.lorem.word(),
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
  }
}
