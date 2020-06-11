import * as bcrypt from 'bcrypt'
import * as mongoose from 'mongoose'

import config from '../config'
import {IUser} from '../interfaces/IUser'

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    email: {
      type: String,
      required: [true, 'Please enter email'],
      lowercase: true,
      unique: true,
      index: true,
    },

    fcm: {
      type: Boolean,
      required: true,
      default: false,
    },

    password: String,

    googleId: String,

    picture: String,

    registrationToken: String,

    firstSignIn: {type: Boolean, default: true, required: true},

    verified: {
      type: Boolean,
      required: true,
      default: false,
    },

    verificationToken: String,

    role: {
      type: String,
      default: 'user',
    },

    configuration: {
      darkMode: {
        type: Boolean,
        default: false,
      },
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend',
      },
    ],

    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
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

    toDos: [
      {
        task: {type: String, required: true},
        urgency: {
          type: String,
          required: true,
          enum: ['IMPORTANT', 'NORMAL', 'CHILL'],
        },
        done: {type: Boolean, default: false},
      },
    ],

    semesters: [
      {
        _id: {
          type: String,
          required: true,
        },
        grades: [
          {
            subject: String,
            literalGrade: String,
            grade: Number,
            credits: Number,
          },
        ],
      },
    ],
  },
  {timestamps: true},
)

User.pre('save', function (this: IUser & mongoose.Document, next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(config.saltRounds, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
})

export default mongoose.model<IUser & mongoose.Document>('User', User)
