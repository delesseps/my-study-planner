import {IEvaluation, Urgency} from '../interfaces'
import * as mongoose from 'mongoose'

const Evaluation = new mongoose.Schema({
  name: {type: String, required: true},
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  linked: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model<IEvaluation & mongoose.Document>(
  'Evaluation',
  Evaluation,
)
