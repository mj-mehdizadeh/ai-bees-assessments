import * as Joi from 'joi';

export default Joi.object({
  APP_NAME: Joi.string().default('n/a'),
  APP_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  MONGO_URL: Joi.string()
    .required()
    .regex(/^mongodb/),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number().default(9000),
});
