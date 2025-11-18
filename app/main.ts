import app from './app';
import envConfig from './config/env.config';
import Logger from './utils/logger.utils';
import connectDB from './db/db';

const env = envConfig.SERVER.NODE_ENV;
const port = envConfig.SERVER.PORT;

connectDB()
	.then(() => {
		app.listen(port, () => {
			Logger.info(`Server running in ${env} mode on http://localhost:${port}`);
		});
	})
	.catch((err) => {
		Logger.error(`Database connection error: ${err}`);
		process.exit(1);
	});
