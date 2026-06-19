import { Request, Response, NextFunction } from 'express';
import * as vehicleService from '../services/vehicle.service.js';

export const getAllVehicles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (err) {
    next(err);
  }
};

export const getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const vehicle = await vehicleService.getVehicleById(id);
    res.status(200).json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { plate, brand, model, year, maxCapacityKg, driverId, branchId } = req.body;
    const vehicle = await vehicleService.createVehicle(plate, brand, model, year, maxCapacityKg, driverId, branchId);
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const vehicle = await vehicleService.updateVehicle(id, req.body);
    res.status(200).json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await vehicleService.deleteVehicle(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};