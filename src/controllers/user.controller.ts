import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service.js';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await userService.createUser(name, email, password, role);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const user = await userService.updateUser(id, req.body);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};