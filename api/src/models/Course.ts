import {ICourse} from '../interfaces'
import * as mongoose from 'mongoose'

const Course = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a course name'],
      index: true,
    },
    schedule: {
      type: Map,
      of: {
        start: Number,
        end: Number,
        classroom: String,
      },
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    homework: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework',
      },
    ],
    evaluations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evaluation',
      },
    ],
    activity: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {timestamps: true},
)

export default mongoose.model<ICourse & mongoose.Document>('Course', Course)
