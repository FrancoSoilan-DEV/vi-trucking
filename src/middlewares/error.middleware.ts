import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    // Si es error 401 y viene del navegador, redirigir al login
    if (err.statusCode === 401 && req.accepts('html')) {
      return res.redirect('/login');
    }

    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
  });
};