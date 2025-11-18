import { Router } from 'express';
import employeeController from '../controllers/employee.controller';
import validateRequest from '../middlewares/validation.middleware';
import { createEmployeeValidationSchema } from '../validations/employee.validation';

const router = Router();

router
	.route('/')
	.post(validateRequest(createEmployeeValidationSchema), employeeController.createProductHandler);
export default router;
