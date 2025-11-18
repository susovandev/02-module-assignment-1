import mongoose from 'mongoose';
import Logger from '../utils/logger.utils';
import envConfig from '../config/env.config';

const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(envConfig.DB.URI as string);
		Logger.info(`Database connected: ${connectionInstance.connection.host}`);
	} catch (error) {
		Logger.error(`Database connection error: ${error}`);
		throw error;
	}
};

export default connectDB;
