import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required()
});

export default userSchema;
