import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { ROLES } from '../config/constants.js';

type Role = keyof typeof ROLES;

export const roleMiddleware = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      throw new AppError('No authenticated', 401);
    }

    if (!roles.includes(user.role)) {
      throw new AppError('You are not allowed to do this', 403);
    }

    next();
  };
};