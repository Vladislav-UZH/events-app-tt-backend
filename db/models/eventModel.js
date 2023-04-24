const Joi = require('joi').extend(require('@joi/date'));

// const moment = require('moment');
const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../../helpers');

// YYYY-MM-DD
// eslint-disable-next-line no-useless-escape
const dateRegExp =
  /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      match: dateRegExp,
      required: true,
    },
    endDate: {
      type: String,
      match: dateRegExp,

      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'author',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

eventSchema.post('save', handleMongooseError);
const Event = model('event', eventSchema);

// validation schemas
const errorMessages = {
  pastStartDate: 'The start date cannot be in the past',
  pastEndDate: 'The end date cannot be in the past',
  futureEndDate: ' Field "endDate" must be in the future',
};
//
const createEventSchema = Joi.object({
  title: Joi.string().max(40).required(),
  description: Joi.string().required(),
  startDate: Joi.date().format('YYYY-MM-DD').required(),
  endDate: Joi.date()
    .format('YYYY-MM-DD')
    .min(Joi.ref('startDate'))
    .message(errorMessages.pastEndDate)
    .required(),
});
const schemas = { createEventSchema };
module.exports = { Event, schemas };
