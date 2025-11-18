import employeeModel, { type IEmployeeDocument } from '../model/employee.model';
import { ConflictException, InternalServerException } from '../utils/apiError.utils';
import Logger from '../utils/logger.utils';
class EmployeeService {
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
}

export default new EmployeeService();
