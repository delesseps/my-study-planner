import {build, fake, perBuild, oneOf} from '@jackfranklin/test-data-bot'

export const buildUser = build('User', {
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

export const buildHomework = build('Homework', {
  fields: {
    _id: fake(f => f.random.uuid()),
    subject: fake(f => f.name.jobTitle()),
    date: new Date().toISOString(),
    urgency: oneOf('chill', 'normal', 'important'),
    description: fake(f => f.name.jobDescriptor()),
    done: perBuild(() => false),
  },
})

export const buildEvaluation = build('Evaluation', {
  fields: {
    _id: fake(f => f.random.uuid()),
    subject: fake(f => f.name.jobTitle()),
    date: new Date().toISOString(),
    urgency: oneOf('chill', 'normal', 'important'),
    description: fake(f => f.name.jobDescriptor()),
    done: perBuild(() => false),
    evaluationType: oneOf('quiz', 'test'),
  },
})
