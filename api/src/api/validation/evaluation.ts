import {Joi} from 'celebrate'

export const evaluationDTOJoi = {
  subject: Joi.string().required(),
  evaluationType: Joi.string().valid('quiz', 'test').required(),
  urgency: Joi.string().valid('chill', 'normal', 'important').required(),
  description: Joi.string().allow(''),
  date: Joi.date().required(),
  shouldAddToCourse: Joi.boolean(),
}

export const evaluationJoi = {
  _id: Joi.string().required(),
  subject: Joi.string().required(),
  evaluationType: Joi.string().valid('quiz', 'test').required(),
  urgency: Joi.string().valid('chill', 'normal', 'important').required(),
  description: Joi.string().allow(''),
  date: Joi.date().required(),
  createdBy: Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    picture: Joi.string(),
  }),
}
