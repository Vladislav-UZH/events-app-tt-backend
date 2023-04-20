const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../../helpers/handleMongoosError");

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
      type: Date,
      match: dateRegExp,
      required: true,
    },
    endDate: {
      type: Date,
      match: dateRegExp,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
eventSchema.post("save", handleMongooseError);
const Event = model("event", eventSchema);

// validation schemas
const createEventSchema = Joi.object({
  title: Joi.string().max(40).required(),
  description: Joi.string().required(),
  startDate: Joi.string().pattern(dateRegExp).required(),
  endDate: Joi.string().pattern(dateRegExp).required(),
});
const schemas = { createEventSchema };
module.exports = { Event, schemas };
