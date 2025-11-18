import { Router } from 'express';
import employeeController from '../controllers/employee.controller';
import validateRequest from '../middlewares/validation.middleware';
import { createEmployeeValidationSchema, validateId } from '../validations/employee.validation';

const router = Router();

router
	.route('/:id')
	.get(validateRequest(validateId, 'params'), employeeController.fetchEmployeeHandler);
router
	.route('/')
	.post(validateRequest(createEmployeeValidationSchema), employeeController.createEmployeeHandler);
export default router;
