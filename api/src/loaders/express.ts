import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as passport from 'passport'
import * as expressSession from 'express-session'
import * as Agendash from 'agendash'
import * as Agenda from 'agenda'

import routes from '../api'
import config from '../config'
import corsOptions from '../config/cors'
import redisClient from './redis'

export default ({
  app,
  agendaInstance,
}: {
  app: express.Application
  agendaInstance: Agenda
}) => {
  app.use(require('express-status-monitor')())

  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end()
  })
  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  app.use('/agendash', Agendash(agendaInstance))

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy')

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors(corsOptions))

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(require('method-override')())

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json({limit: '2mb'}))

  const redisStore = require('connect-redis')(expressSession)

  app.use(
    expressSession({
      secret: config.sessionSecret,
      resave: true,
      saveUninitialized: true,
      cookie: {secure: false, domain: config.cookiesDomain},
      store: new redisStore({client: redisClient}),
    }),
  )

  /**
   * Passport initialization
   */
  require('../config/passport')

  app.use(passport.initialize())

  app.use(passport.session())

  // Load API routes
  app.use(config.api.prefix, routes)

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err['status'] = 404
    next(err)
  })

  /// error handlers
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({message: err.message}).end()
    }
    return next(err)
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      errors: {
        message: err.message,
      },
    })
  })
}
