import { Request, Response, NextFunction } from 'express';
import * as tripService from '../services/trip.service.js';

export const getAllTrips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trips = await tripService.getAllTrips();
    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};

export const getTripById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const trip = await tripService.getTripById(id);
    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};

export const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      origin,
      destination,
      distanceKm,
      departureAt,
      baseAmount,
      driverId,
      vehicleId,
      clientId,
      branchId,
      cargo,
    } = req.body;

    const trip = await tripService.createTrip(
      origin,
      destination,
      distanceKm,
      new Date(departureAt),
      baseAmount,
      driverId,
      vehicleId,
      clientId,
      branchId,
      cargo
    );
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
};

export const updateTripStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const { status } = req.body;
    const trip = await tripService.updateTripStatus(id, status);
    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};

export const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await tripService.deleteTrip(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};