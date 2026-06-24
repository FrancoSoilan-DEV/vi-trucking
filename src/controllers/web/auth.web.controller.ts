import { Request, Response } from 'express';
import * as authService from '../../services/auth.service.js';

export const getLogin = (req: Request, res: Response) => {
  res.render('pages/auth/login', { layout: 'layouts/empty', error: null });
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    (req as any).session = result;
    res.cookie('token', result.token, { httpOnly: true });
    res.cookie('user', JSON.stringify(result.user), { httpOnly: false });
    res.redirect('/dashboard');
  } catch (err: any) {
    res.render('pages/auth/login', { error: err.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.clearCookie('user');
  res.redirect('/auth/login');
};