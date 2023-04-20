const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../../helpers/handleMongoosError");
// eslint-disable-next-line no-useless-escape
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const authorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegEx,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    totalEvents: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
authorSchema.post("save", handleMongooseError);
const Author = model("author", authorSchema);

// validation schemas
const createAuthorSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegEx),
  phoneNumber: Joi.string().min(2).max(15),
});
const schemas = { createAuthorSchema };

module.exports = { Author, schemas };
