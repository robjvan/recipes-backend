import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  BASE_URL: Joi.string().required(),
  ENV: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  API_KEY: Joi.string().required(),
});
