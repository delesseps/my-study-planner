import {Router, Request, Response, NextFunction} from 'express'
import {isAuthorized} from '../middlewares'
import {celebrate, Joi} from 'celebrate'
import {Container} from 'typedi'
import EvaluationService from '../../services/evaluation'
import IEvaluation from '../../interfaces/IEvaluation'
import {IUser} from '../../interfaces/IUser'
import {evaluationDTOJoi, evaluationJoi} from '../validation'
import LoggerInstance from '../../loaders/logger'

const route = Router()

export default (app: Router): void => {
  app.use('/evaluation', route)

  route.post(
    '/add',
    celebrate({
      body: Joi.object(evaluationDTOJoi),
    }),
    isAuthorized,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const evaluationServiceInstance = Container.get(EvaluationService)
        const evaluation = await evaluationServiceInstance.Add(
          req.user as IUser,
          req.body as IEvaluation,
        )

        res.json({evaluation}).status(200)
      } catch (e) {
        LoggerInstance.error(e)
        next(e)
      }
    },
  )

  route.patch(
    '/update',
    celebrate({
      body: Joi.object(evaluationJoi),
    }),
    isAuthorized,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const evaluationServiceInstance = Container.get(EvaluationService)
        const evaluation = await evaluationServiceInstance.Update(
          req.user as IUser,
          req.body as IEvaluation,
        )

        res.json({evaluation}).status(200)
      } catch (e) {
        LoggerInstance.error(e)
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
        const evaluationServiceInstance = Container.get(EvaluationService)

        await evaluationServiceInstance.Delete(req.user._id, req.body._id)

        res.json('done').status(200)
      } catch (e) {
        LoggerInstance.error(e)
        next(e)
      }
    },
  )
}
