import employeeModel, { type IEmployeeDocument } from '../model/employee.model';
import {
	ConflictException,
	InternalServerException,
	NotFoundException,
} from '../utils/apiError.utils';
import Logger from '../utils/logger.utils';

interface queryParams {
	page: number;
	limit: number;
	name: string;
	department: string;
	email: string;
}
class EmployeeService {
	async findAll(queryParam: Partial<queryParams>) {
		try {
			Logger.info(`[EmployeeService] Fetch employees request received`);
			const page = Number(queryParam.page) || 0;
			const limit = Number(queryParam.limit) || 10;
			const skip = page * limit;

			const { name, email, department } = queryParam;

			type ProductFilters = {
				name: { $regex: string; $options: string };
				email: { $regex: string; $options: string };
				department: { $regex: string; $options: string };
			};

			const filters: Partial<ProductFilters> = {};

			if (name) {
				filters.name = { $regex: name, $options: 'i' };
			}

			if (email) {
				filters.email = { $regex: email, $options: 'i' };
			}

			if (department) {
				filters.department = { $regex: department, $options: 'i' };
			}

			console.log(filters);

			const [employees, totalEmployees] = await Promise.all([
				employeeModel
					.find({ ...filters })
					.sort({ createdAt: -1 })
					.skip(skip)
					.limit(Number(limit)),
				employeeModel.countDocuments({ ...filters }),
			]);

			if (!employees.length) {
				throw new NotFoundException('No employees found with this given query');
			}

			const response = {
				pagination: {
					currentPage: page,
					limit,
					totalEmployees,
					totalPages: Math.ceil(totalEmployees / limit),
					hasNextPage: (page + 1) * limit < totalEmployees,
					hasPrevPage: page > 0,
				},
				employees,
			};

			return response;
		} catch (error) {
			Logger.warn('[EmployeeService] Error fetching employees', error);
			throw error;
		}
	}
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
	async delete(employeeId: string) {
		try {
			Logger.info(`[EmployeeService] Delete employee request received with id: ${employeeId}`);

			const deletedEmployee = await employeeModel.findByIdAndDelete(employeeId);
			if (!deletedEmployee) {
				throw new NotFoundException('Employee not found for given ID');
			}

			return deletedEmployee;
		} catch (error) {
			Logger.warn('[EmployeeService] Error deleting employee', error);
			throw error;
		}
	}
}

export default new EmployeeService();
