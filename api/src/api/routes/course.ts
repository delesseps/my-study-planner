import {Router, Request, Response, NextFunction} from 'express'
import {isAuthorized} from '../middlewares'
import {celebrate, Joi} from 'celebrate'
import {Container} from 'typedi'
import CourseService from '../../services/course'
import {IUser} from '../../interfaces/IUser'
import {ICourse} from '../../interfaces'
import {homeworkJoi, evaluationJoi} from '../validation'

const route = Router()

export default (app: Router): void => {
  app.use('/course', route)

  route.get(
    '/',
    isAuthorized,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const courseServiceInstance = Container.get(CourseService)
        const course = await courseServiceInstance.get(req.user as IUser)

        res.json({course}).status(200)
      } catch (e) {
        console.log(e)
        next(e)
      }
    },
  )

  route.get(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    isAuthorized,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {id} = req.params
        const userId: string = req.user._id

        const courseServiceInstance = Container.get(CourseService)
        const course = await courseServiceInstance.getById(userId, id as string)

        res.json({course}).status(200)
      } catch (e) {
        console.log(e)
        next(e)
      }
    },
  )

  route.post(
    '/add',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        schedule: Joi.object()
          .pattern(
            /MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY/,
            Joi.object().keys({
              start: Joi.number().required(),
              end: Joi.number().required(),
              classroom: Joi.string().required(),
            }),
          )
          .required(),
      }),
    }),
    isAuthorized,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const courseServiceInstance = Container.get(CourseService)
        const course = await courseServiceInstance.Add(
          req.user as IUser,
          req.body as ICourse,
        )

        res.json({course}).status(200)
      } catch (e) {
        console.log(e)
        next(e)
      }
    },
  )

  route.patch(
    '/update',
    celebrate({
      body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        schedule: Joi.object()
          .pattern(
            /MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY/,
            Joi.object().keys({
              start: Joi.number().required(),
              end: Joi.number().required(),
              classroom: Joi.string().required(),
            }),
          )
          .required(),
        homework: Joi.array().items(Joi.object(homeworkJoi)).required(),
        evaluations: Joi.array().items(Joi.object(evaluationJoi)).required(),
        members: Joi.array().items(Joi.string()),
        createdBy: Joi.string(),
      }),
    }),
    isAuthorized,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const courseServiceInstance = Container.get(CourseService)
        const course = await courseServiceInstance.Update(
          req.user as IUser,
          req.body as ICourse,
        )

        res.json({course}).status(200)
      } catch (e) {
        console.log(e)
        next(e)
      }
    },
  )

  route.delete(
    '/delete',
    celebrate({
      body: Joi.object({
        _id: Joi.string().required(),
      }),
    }),
    isAuthorized,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const courseServiceInstance = Container.get(CourseService)
        await courseServiceInstance.Delete(req.user._id, req.body._id)

        res.json('done').status(200)
      } catch (e) {
        console.log(e)
        next(e)
      }
    },
  )
}
