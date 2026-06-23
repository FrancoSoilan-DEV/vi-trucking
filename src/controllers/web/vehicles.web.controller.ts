import { Request, Response } from 'express';
import * as vehicleService from '../../services/vehicle.service.js';
import * as driverService from '../../services/driver.service.js';
import * as branchService from '../../services/branch.service.js';

const getUser = (req: Request) => JSON.parse(req.cookies['user'] || '{}');

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.render('pages/vehicles/index', {
      title: 'Vehículos', page: 'vehicles',
      user: getUser(req), vehicles, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/dashboard');
  }
};

export const getNewVehicle = async (req: Request, res: Response) => {
  try {
    const [drivers, branches] = await Promise.all([
      driverService.getAllDrivers(),
      branchService.getAllBranches(),
    ]);
    res.render('pages/vehicles/form', {
      title: 'Nuevo vehículo', page: 'vehicles',
      user: getUser(req), vehicle: null, drivers, branches, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/vehicles');
  }
};

export const postNewVehicle = async (req: Request, res: Response) => {
  try {
    const { plate, brand, model, year, maxCapacityKg, driverId, branchId } = req.body;
    await vehicleService.createVehicle(plate, brand, model, parseInt(year), parseFloat(maxCapacityKg), parseInt(driverId), parseInt(branchId));
    res.redirect('/vehicles');
  } catch (err: any) {
    const [drivers, branches] = await Promise.all([driverService.getAllDrivers(), branchService.getAllBranches()]);
    res.render('pages/vehicles/form', {
      title: 'Nuevo vehículo', page: 'vehicles',
      user: getUser(req), vehicle: null, drivers, branches, error: err.message, success: null,
    });
  }
};

export const getEditVehicle = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const [vehicle, drivers, branches] = await Promise.all([
      vehicleService.getVehicleById(id),
      driverService.getAllDrivers(),
      branchService.getAllBranches(),
    ]);
    res.render('pages/vehicles/form', {
      title: 'Editar vehículo', page: 'vehicles',
      user: getUser(req), vehicle, drivers, branches, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/vehicles');
  }
};

export const postEditVehicle = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await vehicleService.updateVehicle(id, req.body);
    res.redirect('/vehicles');
  } catch (err: any) {
    res.redirect('/vehicles');
  }
};

export const postDeleteVehicle = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await vehicleService.deleteVehicle(id);
    res.redirect('/vehicles');
  } catch (err: any) {
    res.redirect('/vehicles');
  }
};