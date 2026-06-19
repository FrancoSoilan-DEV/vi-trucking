import { Request, Response, NextFunction } from 'express';
import * as driverService from '../services/driver.service.js';

export const getAllDrivers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const drivers = await driverService.getAllDrivers();
    res.status(200).json(drivers);
  } catch (err) {
    next(err);
  }
};

export const getDriverById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const driver = await driverService.getDriverById(id);
    res.status(200).json(driver);
  } catch (err) {
    next(err);
  }
};

export const createDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { license, userId } = req.body;
    const driver = await driverService.createDriver(license, userId);
    res.status(201).json(driver);
  } catch (err) {
    next(err);
  }
};

export const updateDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const driver = await driverService.updateDriver(id, req.body);
    res.status(200).json(driver);
  } catch (err) {
    next(err);
  }
};

export const deleteDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await driverService.deleteDriver(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};