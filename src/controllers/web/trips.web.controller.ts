import { Request, Response } from 'express';
import * as tripService from '../../services/trip.service.js';
import * as driverService from '../../services/driver.service.js';
import * as vehicleService from '../../services/vehicle.service.js';
import * as clientService from '../../services/client.service.js';
import * as branchService from '../../services/branch.service.js';

const getUser = (req: Request) => JSON.parse(req.cookies['user'] || '{}');

export const getTrips = async (req: Request, res: Response) => {
  try {
    const trips = await tripService.getAllTrips();
    res.render('pages/trips/index', {
      title: 'Viajes', page: 'trips',
      user: getUser(req), trips, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/dashboard');
  }
};

export const getNewTrip = async (req: Request, res: Response) => {
  try {
    const [drivers, vehicles, clients, branches] = await Promise.all([
      driverService.getAllDrivers(),
      vehicleService.getAllVehicles(),
      clientService.getAllClients(),
      branchService.getAllBranches(),
    ]);
    res.render('pages/trips/form', {
      title: 'Nuevo viaje', page: 'trips',
      user: getUser(req), drivers, vehicles, clients, branches, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/trips');
  }
};

export const postNewTrip = async (req: Request, res: Response) => {
  try {
    const { origin, destination, distanceKm, departureAt, baseAmount, driverId, vehicleId, clientId, branchId, cargoType, weightKg, description } = req.body;
    await tripService.createTrip(
      origin, destination,
      parseFloat(distanceKm),
      new Date(departureAt),
      parseFloat(baseAmount),
      parseInt(driverId),
      parseInt(vehicleId),
      parseInt(clientId),
      parseInt(branchId),
      { type: cargoType, weightKg: parseFloat(weightKg), description }
    );
    res.redirect('/trips');
  } catch (err: any) {
    const [drivers, vehicles, clients, branches] = await Promise.all([
      driverService.getAllDrivers(), vehicleService.getAllVehicles(),
      clientService.getAllClients(), branchService.getAllBranches(),
    ]);
    res.render('pages/trips/form', {
      title: 'Nuevo viaje', page: 'trips',
      user: getUser(req), drivers, vehicles, clients, branches, error: err.message, success: null,
    });
  }
};

export const postDeleteTrip = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await tripService.deleteTrip(id);
    res.redirect('/trips');
  } catch (err: any) {
    res.redirect('/trips');
  }
};