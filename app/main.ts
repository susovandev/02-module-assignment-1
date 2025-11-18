import app from './app';
import envConfig from './config/env.config';
import Logger from './utils/logger.utils';

const env = envConfig.SERVER.NODE_ENV;
const port = envConfig.SERVER.PORT;

app.listen(port, () => {
	Logger.info(`Server running in ${env} mode on http://localhost:${port}`);
});
