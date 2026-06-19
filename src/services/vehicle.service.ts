import prisma from '../database/client.js';
import { AppError } from '../utils/AppError.js';

export const getAllVehicles = async () => {
  return await prisma.vehicle.findMany({
    include: {
      driver: {
        include: {
          user: { select: { id: true, name: true, email: true } }
        }
      },
      branch: true,
    }
  });
};

export const getVehicleById = async (id: number) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      driver: {
        include: {
          user: { select: { id: true, name: true, email: true } }
        }
      },
      branch: true,
    }
  });

  if (!vehicle) throw new AppError('Vehículo no encontrado', 404);
  return vehicle;
};

export const createVehicle = async (
  plate: string,
  brand: string,
  model: string,
  year: number,
  maxCapacityKg: number,
  driverId: number,
  branchId: number
) => {
  const existing = await prisma.vehicle.findUnique({ where: { plate } });
  if (existing) throw new AppError('La chapa ya está registrada', 400);

  const driver = await prisma.driver.findUnique({ where: { id: driverId } });
  if (!driver) throw new AppError('Conductor no encontrado', 404);

  const branch = await prisma.branch.findUnique({ where: { id: branchId } });
  if (!branch) throw new AppError('Sede no encontrada', 404);

  return await prisma.vehicle.create({
    data: { plate, brand, model, year, maxCapacityKg, driverId, branchId },
  });
};

export const updateVehicle = async (id: number, data: {
  plate?: string;
  brand?: string;
  model?: string;
  year?: number;
  maxCapacityKg?: number;
  totalKm?: number;
  lastMaintenance?: Date;
  licenseExpiryDate?: Date;
}) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) throw new AppError('Vehículo no encontrado', 404);

  return await prisma.vehicle.update({ where: { id }, data });
};

export const deleteVehicle = async (id: number) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) throw new AppError('Vehículo no encontrado', 404);

  await prisma.vehicle.delete({ where: { id } });
};