import { Request, Response } from 'express';
import * as driverService from '../../services/driver.service.js';
import * as userService from '../../services/user.service.js';

const getUser = (req: Request) => JSON.parse(req.cookies['user'] || '{}');

export const getDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await driverService.getAllDrivers();
    res.render('pages/drivers/index', {
      title: 'Conductores', page: 'drivers',
      user: getUser(req), drivers, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/dashboard');
  }
};

export const getNewDriver = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.render('pages/drivers/form', {
      title: 'Nuevo conductor', page: 'drivers',
      user: getUser(req), driver: null, users, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/drivers');
  }
};

export const postNewDriver = async (req: Request, res: Response) => {
  try {
    const { license, userId } = req.body;
    await driverService.createDriver(license, parseInt(userId));
    res.redirect('/drivers');
  } catch (err: any) {
    const users = await userService.getAllUsers();
    res.render('pages/drivers/form', {
      title: 'Nuevo conductor', page: 'drivers',
      user: getUser(req), driver: null, users, error: err.message, success: null,
    });
  }
};

export const getEditDriver = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const [driver, users] = await Promise.all([
      driverService.getDriverById(id),
      userService.getAllUsers(),
    ]);
    res.render('pages/drivers/form', {
      title: 'Editar conductor', page: 'drivers',
      user: getUser(req), driver, users, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/drivers');
  }
};

export const postEditDriver = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await driverService.updateDriver(id, req.body);
    res.redirect('/drivers');
  } catch (err: any) {
    res.redirect('/drivers');
  }
};

export const postDeleteDriver = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await driverService.deleteDriver(id);
    res.redirect('/drivers');
  } catch (err: any) {
    res.redirect('/drivers');
  }
};