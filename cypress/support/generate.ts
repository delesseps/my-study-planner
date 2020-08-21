import {build, fake, perBuild, oneOf} from '@jackfranklin/test-data-bot'

import IUser from '../types/IUser'
import IHomework from '../types/IHomework'
import {ICourse} from '../types'
import IEvaluation from '../types/IEvaluation'

export const buildUser = build<IUser>('User', {
  fields: {
    _id: fake(f => f.random.uuid()),
    name: fake(f => f.name.findName()),
    email: fake(f => f.internet.email()),
    password: fake(f => f.internet.password(6)),
    picture: fake(f => f.image.image()),
    firstSignIn: perBuild(() => false),
    fcm: perBuild(() => false),
    role: 'user',
    verified: perBuild(() => false),
    configuration: {
      darkMode: perBuild(() => false),
    },
    evaluations: [],
    homework: [],
    toDos: [],
    semesters: [],
  },
})

export const buildHomework = build<Omit<IHomework, 'createdBy'>>('Homework', {
  fields: {
    _id: fake(f => f.random.uuid()),
    name: fake(f => f.name.jobTitle()),
    date: new Date().toISOString(),
    urgency: oneOf('chill', 'normal', 'important'),
    description: fake(f => f.name.jobDescriptor()),
    course: {
      name: fake(f => f.name.jobTitle()),
    },
    done: [],
  },
})

export const buildEvaluation = build<Omit<IEvaluation, 'createdBy'>>(
  'Evaluation',
  {
    fields: {
      _id: fake(f => f.random.uuid()),
      subject: fake(f => f.name.jobTitle()),
      date: new Date().toISOString(),
      urgency: oneOf('chill', 'normal', 'important'),
      description: fake(f => f.name.jobDescriptor()),
      courseId: '',
      done: [],
      evaluationType: oneOf('quiz', 'test'),
    },
  },
)

function getRandomWeekday({exclude}: {exclude?: string} = {}): string {
  const weekdays = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ]
  const index = Math.floor(Math.random() * (weekdays.length - 1))
  const weekday = weekdays[index]

  // Avoid collision of random values
  if (weekday === exclude) return getRandomWeekday({exclude})

  return weekday
}

export const buildCourse = build<ICourse>('Course', {
  fields: {
    _id: fake(f => f.random.uuid()),
    name: fake(f => f.name.jobTitle()),
    schedule: {},
    members: [],
    evaluations: [],
    homework: [],
  },
  postBuild: course => {
    const firstDay = getRandomWeekday()
    const secondDay = getRandomWeekday({exclude: firstDay})

    course.schedule = {
      [firstDay]: {
        start: 54000,
        end: 64800,
        classroom: 'Virtual',
      },
      [secondDay]: {
        start: 64800,
        end: 72000,
        classroom: 'FR-301',
      },
    }
    return course
  },
})
