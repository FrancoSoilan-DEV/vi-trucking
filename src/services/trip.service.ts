import prisma from '../database/client.js';
import { AppError } from '../utils/AppError.js';
import { findMatchingTariff } from './tariff.service.js';

export const getAllTrips = async () => {
  return await prisma.trip.findMany({
    include: {
      driver: { include: { user: { select: { id: true, name: true } } } },
      client: true,
      vehicle: true,
      cargo: true,
      payment: true,
      tariff: true,
      branch: true,
    }
  });
};

export const getTripById = async (id: number) => {
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      driver: { include: { user: { select: { id: true, name: true } } } },
      client: true,
      vehicle: true,
      cargo: true,
      payment: true,
      tariff: true,
      branch: true,
    }
  });

  if (!trip) throw new AppError('Viaje no encontrado', 404);
  return trip;
};

export const createTrip = async (
  origin: string,
  destination: string,
  distanceKm: number,
  departureAt: Date,
  baseAmount: number,
  driverId: number,
  vehicleId: number,
  clientId: number,
  branchId: number,
  cargo: { type: string; weightKg: number; description?: string }
) => {
  // 1. Verificar que existen el conductor, vehículo, cliente y sede
  const driver = await prisma.driver.findUnique({ where: { id: driverId } });
  if (!driver) throw new AppError('Conductor no encontrado', 404);

  const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
  if (!vehicle) throw new AppError('Vehículo no encontrado', 404);

  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) throw new AppError('Cliente no encontrado', 404);

  const branch = await prisma.branch.findUnique({ where: { id: branchId } });
  if (!branch) throw new AppError('Sede no encontrada', 404);

  // 2. Buscar la tarifa correcta y calcular el costo final
  const tariff = await findMatchingTariff(client.country, distanceKm, cargo.type);
  const finalCost = baseAmount * tariff.multiplier + tariff.fixedAmount;

  // 3. Crear el viaje con la carga y el pago en una sola operación
  const trip = await prisma.trip.create({
    data: {
      origin,
      destination,
      distanceKm,
      departureAt,
      baseAmount,
      finalCost,
      driverId,
      vehicleId,
      clientId,
      branchId,
      tariffId: tariff.id,
      userId: client.userId,
      cargo: {
        create: {
          type: cargo.type as any,
          weightKg: cargo.weightKg,
          description: cargo.description,
        }
      },
      payment: {
        create: {
          amount: finalCost,
        }
      }
    },
    include: { cargo: true, payment: true, tariff: true }
  });

  // 4. Actualizar estadísticas del cliente y vehículo
  await prisma.client.update({
    where: { id: clientId },
    data: {
      totalOrders: { increment: 1 },
      totalTrucksSent: { increment: 1 },
      totalRevenue: { increment: finalCost },
    }
  });

  await prisma.vehicle.update({
    where: { id: vehicleId },
    data: {
      totalTrips: { increment: 1 },
      totalKm: { increment: distanceKm },
    }
  });

  return trip;
};

export const updateTripStatus = async (id: number, status: string) => {
  const trip = await prisma.trip.findUnique({ where: { id } });
  if (!trip) throw new AppError('Viaje no encontrado', 404);

  return await prisma.trip.update({
    where: { id },
    data: { status: status as any }
  });
};

export const deleteTrip = async (id: number) => {
  const trip = await prisma.trip.findUnique({ where: { id } });
  if (!trip) throw new AppError('Viaje no encontrado', 404);

  await prisma.trip.delete({ where: { id } });
};