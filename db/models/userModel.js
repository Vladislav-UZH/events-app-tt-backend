const Joi = require("joi");
const { Schema, model } = require("mongoose");
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
userSchema.post("save");

// validation schemas
const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
  password: Joi.string().min(6).required(),
});
const User = model("user", userSchema);
const schemas = { registerSchema, loginSchema };
module.exports = schemas;
module.exports = User;
