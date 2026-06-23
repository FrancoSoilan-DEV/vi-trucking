import { Request, Response } from 'express';
import * as userService from '../../services/user.service.js';

const getUser = (req: Request) => JSON.parse(req.cookies['user'] || '{}');

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.render('pages/users/index', {
      title: 'Usuarios', page: 'users',
      user: getUser(req), users, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/dashboard');
  }
};

export const getNewUser = (req: Request, res: Response) => {
  res.render('pages/users/form', {
    title: 'Nuevo usuario', page: 'users',
    user: getUser(req), currentUser: getUser(req),
    success: null, error: null,
  });
};

export const postNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    await userService.createUser(name, email, password, role);
    res.redirect('/users');
  } catch (err: any) {
    res.render('pages/users/form', {
      title: 'Nuevo usuario', page: 'users',
      user: getUser(req), currentUser: getUser(req),
      error: err.message, success: null,
    });
  }
};

export const getEditUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const editUser = await userService.getUserById(id);
    res.render('pages/users/form', {
      title: 'Editar usuario', page: 'users',
      user: getUser(req), currentUser: getUser(req),
      editUser, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/users');
  }
};

export const postEditUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await userService.updateUser(id, req.body);
    res.redirect('/users');
  } catch (err: any) {
    res.redirect('/users');
  }
};

export const postDeleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await userService.deleteUser(id);
    res.redirect('/users');
  } catch (err: any) {
    res.redirect('/users');
  }
};