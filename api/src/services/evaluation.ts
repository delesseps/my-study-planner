import {Service, Inject} from 'typedi'
import {IUser} from '../interfaces/IUser'
import IEvaluation from '../interfaces/IEvaluation'
import winston from 'winston'

@Service()
export default class EvaluationService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('evaluationModel') private evaluationModel: Models.evaluationModel,
    @Inject('logger') private logger: winston.Logger,
  ) {}

  public async Add(user: IUser, evaluation: IEvaluation): Promise<IEvaluation> {
    try {
      evaluation.done = false
      evaluation.createdBy = {
        _id: user._id,
        name: user.name,
        picture: user.picture,
      }

      const evaluationRecord = await (
        await this.evaluationModel.create(evaluation)
      )
        .populate({path: 'createdBy', select: '_id name picture'})
        .execPopulate()

      const userRecord: IUser = await this.userModel.findByIdAndUpdate(
        user._id,
        {
          $push: {evaluations: evaluationRecord._id},
        },
      )

      if (!userRecord || !evaluationRecord) {
        throw new Error('Could not add evaluation')
      }

      return evaluationRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  public async Update(
    user: IUser,
    evaluation: IEvaluation,
  ): Promise<IEvaluation> {
    try {
      evaluation.createdBy = {
        _id: user._id,
        name: user.name,
        picture: user.picture,
      }

      const evaluationRecord = await this.evaluationModel
        .findOneAndUpdate(
          {
            createdBy: {_id: user._id},
            _id: evaluation._id,
          },
          {
            $set: {
              subject: evaluation.subject,
              evaluationType: evaluation.evaluationType,
              date: evaluation.date,
              urgency: evaluation.urgency,
              description: evaluation.description,
              done: evaluation.done,
              createdBy: evaluation.createdBy,
            },
          },
          {new: true},
        )
        .populate({path: 'createdBy', select: '_id name picture'})

      if (!evaluationRecord) {
        throw new Error('Could not update evaluation')
      }

      return evaluationRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  public async Delete(
    userId: string,
    evaluationId: string,
  ): Promise<IEvaluation> {
    try {
      const deletedRecord = await this.evaluationModel.findOneAndRemove({
        _id: evaluationId,
        createdBy: {_id: userId},
      })

      if (!deletedRecord) {
        throw new Error('Could not delete evaluation')
      }

      return deletedRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}
