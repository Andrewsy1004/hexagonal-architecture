import * as	 Joi from 'joi';

export const joiValidationSchema = Joi.object({
    PORT_APP:     Joi.number().required(),
});