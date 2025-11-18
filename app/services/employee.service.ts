import employeeModel, { type IEmployeeDocument } from '../model/employee.model';
import {
	ConflictException,
	InternalServerException,
	NotFoundException,
} from '../utils/apiError.utils';
import Logger from '../utils/logger.utils';
class EmployeeService {
	async findById(employeeId: string) {
		try {
			Logger.info(`[EmployeeService] Find Employee request received with id: ${employeeId}`);

			const employee = await employeeModel.findById(employeeId).lean();
			if (!employee) {
				throw new NotFoundException('Employee not found for given ID');
			}

			return employee;
		} catch (error) {
			Logger.warn('[EmployeeService] Error finding Employee', error);
			throw error;
		}
	}
	async create(employeeData: Omit<IEmployeeDocument, 'createdAt' | 'updatedAt'>) {
		try {
			Logger.info(
				`[EmployeeService] Create employee request received with input: ${JSON.stringify(employeeData)}`,
			);

			const existingEmployee = await employeeModel.findOne({ email: employeeData.email });
			if (existingEmployee) {
				throw new ConflictException('Employee already exists with this email');
			}

			const newEmployee = await employeeModel.create(employeeData);
			if (!newEmployee) {
				throw new InternalServerException('Employee creation failed');
			}

			return newEmployee;
		} catch (error) {
			Logger.warn('[EmployeeService] Error creating employee', error);
			throw error;
		}
	}
	async update(
		employeeId: string,
		employeeData: Partial<Omit<IEmployeeDocument, 'createdAt' | 'updatedAt'>>,
	) {
		try {
			Logger.info(
				`[EmployeeService] update employee request received with id: ${employeeId} and input: ${JSON.stringify(employeeData)}`,
			);

			const updatedEmployee = await employeeModel.findByIdAndUpdate(employeeId, employeeData, {
				new: true,
			});
			if (!updatedEmployee) {
				throw new NotFoundException('employee not found for given ID');
			}

			return updatedEmployee;
		} catch (error) {
			Logger.warn('[EmployeeService] Error updating employee', error);
			throw error;
		}
	}
}

export default new EmployeeService();
