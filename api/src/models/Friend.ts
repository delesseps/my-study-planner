import {ICourse} from '../interfaces'
import * as mongoose from 'mongoose'

const Friend = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accepted: {
      type: Boolean,
      required: true,
    },
  },
  {timestamps: true},
)

export default mongoose.model<ICourse & mongoose.Document>('Friend', Friend)
