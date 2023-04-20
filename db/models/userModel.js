const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../../helpers/handleMongoosError");
// eslint-disable-next-line no-useless-escape
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegEx,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  { versionKey: false }
);
userSchema.post("save", handleMongooseError);

// validation schemas
const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
  password: Joi.string().min(6).required(),
});
const schemas = { registerSchema, loginSchema };
// model
const User = model("user", userSchema);

module.exports = { User, schemas };
