import Joi from 'joi';
import mongoose from 'mongoose';

export const createEmployeeValidationSchema = Joi.object().keys({
	name: Joi.string().required().min(3).max(50),
	email: Joi.string().required().email().min(5).max(50),
	department: Joi.string().required().min(2).max(50),
	position: Joi.string().optional().min(3).max(50),
	salary: Joi.number().optional().positive().precision(2),
});

export const validateId = Joi.object({
	id: Joi.string()
		.required()
		.custom((value, helpers) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				return helpers.error('any.invalid');
			}
			return value;
		}, 'ObjectId validation')
		.messages({
			'any.invalid': 'Invalid Product ID. Must be a valid MongoDB ObjectId.',
			'any.required': 'Product ID is required.',
		}),
});
