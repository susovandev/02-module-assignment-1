import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiResponse from '../utils/apiResponse.utils';
import Logger from '../utils/logger.utils';
import employeeService from '../services/employee.service';
class EmployeeController {
	async fetchEmployeeHandler(req: Request, res: Response, next: NextFunction) {
		try {
			Logger.info(`[EmployeeController] Fetch employee request received with id: ${req.params.id}`);

			// Delegate core logic to service layer
			const employee = await employeeService.findById(req.params.id);

			// Send structured API response
			return res
				.status(StatusCodes.OK)
				.json(new ApiResponse(StatusCodes.OK, 'Employee fetched successfully', employee));
		} catch (error) {
			Logger.warn('[EmployeeController] Error fetching employee', error);
			next(error);
		}
	}
	async createEmployeeHandler(req: Request, res: Response, next: NextFunction) {
		try {
			Logger.info(`[EmployeeController] Create employee request received`);

			// Delegate core logic to service layer
			const newEmployee = await employeeService.create(req.body);

			// Send structured API response
			return res
				.status(StatusCodes.CREATED)
				.json(new ApiResponse(StatusCodes.CREATED, 'Employee created successfully', newEmployee));
		} catch (error) {
			Logger.warn('[EmployeeController] Error creating employee', error);
			next(error);
		}
	}
	async updateEmployeeHandler(req: Request, res: Response, next: NextFunction) {
		try {
			Logger.info(
				`[EmployeeController] update employee request received with id: ${req.params.id}`,
			);

			// Delegate core logic to service layer
			const updatedEmployee = await employeeService.update(req.params.id, req.body);

			// Send structured API response
			return res
				.status(StatusCodes.OK)
				.json(new ApiResponse(StatusCodes.OK, 'Employee updated successfully', updatedEmployee));
		} catch (error) {
			Logger.warn('[EmployeeController] Error update a employee', error);
			next(error);
		}
	}
}

export default new EmployeeController();
