import Joi from 'joi';

export const createEmployeeValidationSchema = Joi.object().keys({
	name: Joi.string().required().min(3).max(50),
	email: Joi.string().required().email().min(5).max(50),
	department: Joi.string().required().min(2).max(50),
	position: Joi.string().optional().min(3).max(50),
	salary: Joi.number().optional().positive().precision(2),
});
