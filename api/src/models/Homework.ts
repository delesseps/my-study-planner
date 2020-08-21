import {IHomework, Urgency} from '../interfaces'
import * as mongoose from 'mongoose'
import Container from 'typedi'

const Homework = new mongoose.Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
  urgency: {
    type: String,
    required: true,
    enum: [...Object.values(Urgency)],
  },
  description: {type: String, default: ''},
  done: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  course: {
    details: {
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

export default mongoose.model<IHomework & mongoose.Document>(
  'Homework',
  Homework,
)
