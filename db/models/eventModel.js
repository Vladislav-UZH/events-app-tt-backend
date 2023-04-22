const Joi = require('joi').extend(require('@joi/date'));
const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../../helpers');

// DD-MM-YYYY
// eslint-disable-next-line no-useless-escape
const dateRegExp = /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19|20)\d{2}$/;
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
  pastDate: 'Event dates cannot be in the past',
  futureEndDate: ' Field "endDate" must be in the future',
};
const createEventSchema = Joi.object({
  title: Joi.string().max(40).required(),
  description: Joi.string().required(),
  startDate: Joi.date()
    .format('DD-MM-YYYY')
    .greater('now')
    .message(errorMessages.pastDate)
    .required(),
  endDate: Joi.date()
    .format('DD-MM-YYYY')
    .greater(Joi.ref('startDate'))
    .message(errorMessages.futureEndDate)
    .greater('now')
    .message(errorMessages.pastDate)
    .required(),
});
const schemas = { createEventSchema };
module.exports = { Event, schemas };
