import {IEvaluation, Urgency} from '../interfaces'
import * as mongoose from 'mongoose'
import Container from 'typedi'

const Evaluation = new mongoose.Schema({
  name: {type: String, required: true},
  subject: {type: String, required: true},
  evaluationType: {type: String, required: true},
  date: {type: Date, required: true},
  urgency: {
    type: String,
    required: true,
    enum: [...Object.values(Urgency)],
  },
  description: {type: String, default: ''},
  done: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  course: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    name: {
      type: String,
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

Evaluation.pre('findOneAndRemove', async function (next) {
  const userModel: Models.UserModel = Container.get('userModel')
  const userId: string = this.getQuery().createdBy._id
  const evaluationId: string = this.getQuery()._id

  const userRecord = await userModel.findByIdAndUpdate(
    userId,
    {
      // @ts-ignore
      $pull: {evaluations: evaluationId},
    },
    {new: true},
  )

  const isSuccessful = userRecord.evaluations.find(
    (id: any) => id === evaluationId,
  )
    ? false
    : true

  if (isSuccessful) {
    next()
  } else {
    throw new Error('Could not remove evaluation from user.')
  }
})

export default mongoose.model<IEvaluation & mongoose.Document>(
  'Evaluation',
  Evaluation,
)
