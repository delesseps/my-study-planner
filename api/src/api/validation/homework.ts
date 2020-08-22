import {Joi} from 'celebrate'

export const homeworkDTOJoi = {
  name: Joi.string().required(),
  urgency: Joi.string().valid('chill', 'normal', 'important').required(),
  description: Joi.string().allow(''),
  date: Joi.date().required(),
  course: Joi.object({
    details: Joi.string().allow(''),
    name: Joi.string().allow(''),
  }),
}

export const homeworkJoi = {
  _id: Joi.string().required(),
  name: Joi.string().required(),
  urgency: Joi.string().valid('chill', 'normal', 'important').required(),
  description: Joi.string().allow(''),
  date: Joi.date().required(),
  course: Joi.object({
    details: Joi.string(),
    name: Joi.string().allow(''),
  }),
  createdBy: Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    picture: Joi.string(),
  }),
}
