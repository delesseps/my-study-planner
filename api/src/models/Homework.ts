import {IHomework, Urgency} from '../interfaces'
import * as mongoose from 'mongoose'
import Container from 'typedi'

const Homework = new mongoose.Schema({
  subject: {type: String, required: true},
  date: {type: Date, required: true},
  urgency: {
    type: String,
    required: true,
    enum: [...Object.values(Urgency)],
  },
  description: {type: String, default: ''},
  done: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

Homework.pre('findOneAndRemove', async function (next) {
  const userModel: Models.UserModel = Container.get('userModel')
  const userId: string = this.getQuery().createdBy._id
  const homeworkId: string = this.getQuery()._id

  const userRecord = await userModel.findByIdAndUpdate(
    userId,
    {
      // @ts-ignore
      $pull: {homework: homeworkId},
    },
    {new: true},
  )

  const isSuccessful = userRecord.homework.find((id: any) => id === homeworkId)
    ? false
    : true

  if (isSuccessful) {
    next()
  } else {
    throw new Error('Could not remove homework from user.')
  }
})

export default mongoose.model<IHomework & mongoose.Document>(
  'Homework',
  Homework,
)
