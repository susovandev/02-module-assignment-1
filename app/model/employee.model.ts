import { Document, Schema, model } from 'mongoose';

/*


const employeeSchema = new mongoose.Schema({ name: { type: String, required: true },

email: { type: String, required: true, unique: true }, department: { type: String, required: true }, position: { type: String },

salary: { type: Number },

hiredDate: { type: Date, default: Date.now },

});
*/
export interface IEmployeeDocument extends Document {
	name: string;
	email: string;
	department: string;
	position: string;
	salary: number;
	hiredDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

const employeeSchema = new Schema<IEmployeeDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		department: { type: String, required: true },
		position: { type: String },
		salary: { type: Number },
		hiredDate: { type: Date, default: Date.now },
	},
	{ timestamps: true },
);

employeeSchema.index({ email: 1 }, { unique: true });
employeeSchema.index({ name: 1, department: 1 });

const employeeModel = model<IEmployeeDocument>('Employee', employeeSchema);

export default employeeModel;
