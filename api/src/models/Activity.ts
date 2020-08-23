import {IActivity, ActivityType} from '../interfaces'
import * as mongoose from 'mongoose'

const Activity = new mongoose.Schema({
  object: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'objectModel',
  },
  objectModel: {
    type: String,
    enum: ['Evaluation', 'Homework'],
  },
  type: {
    type: String,
    enum: [...Object.values(ActivityType)],
    required: true,
  },
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model<IActivity & mongoose.Document>(
  'Activity',
  Activity,
)
