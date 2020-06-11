import {ICourse} from '../interfaces'
import * as mongoose from 'mongoose'

const Notification = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Friend',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<ICourse & mongoose.Document>(
  'Notification',
  Notification,
)
