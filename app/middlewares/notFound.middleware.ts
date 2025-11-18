import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../utils/apiError.utils';

const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	next(new NotFoundException(`Route ${req.originalUrl} not found on this server`));
};

export default routeNotFoundHandler;
