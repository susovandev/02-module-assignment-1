import express from 'express';
import type { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import morganConfig from './config/morgan.config';
import routeNotFoundHandler from './middlewares/notFound.middleware';
import globalErrorHandler from './middlewares/error.middleware';

const app: Application = express();

// Morgan middleware
app.use(morganConfig);

// Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Routes
app.get('/', (req: Request, res: Response) => {
	return res.status(StatusCodes.OK).json({
		statusCode: StatusCodes.OK,
		status: true,
		message: 'Hello World!',
	});
});

// Employee Routes
import employeeRoutes from './routes/employee.routes';
app.use('/api/employees', employeeRoutes);

// 404 Route
app.use(routeNotFoundHandler);

// Global Error Handler
app.use(globalErrorHandler);
export default app;
