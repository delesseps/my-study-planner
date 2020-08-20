import {Joi} from 'celebrate'

export const homeworkDTOJoi = {
  subject: Joi.string().required(),
  urgency: Joi.string().valid('chill', 'normal', 'important').required(),
  description: Joi.string().allow(''),
  date: Joi.date().required(),
  courseId: Joi.string().allow(''),
}

export const homeworkJoi = {
  _id: Joi.string().required(),
  subject: Joi.string().required(),
  urgency: Joi.string().valid('chill', 'normal', 'important').required(),
  description: Joi.string().allow(''),
  date: Joi.date().required(),
  createdBy: Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    picture: Joi.string(),
  }),
}
