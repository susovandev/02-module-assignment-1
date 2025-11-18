import express from 'express';
import type { Application, Request, Response } from 'express';

const app: Application = express();

// Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Routes
app.get('/', (req: Request, res: Response) => {
	return res.status(200).json({
		statusCode: 200,
		status: true,
		message: 'Hello World!',
	});
});

export default app;
