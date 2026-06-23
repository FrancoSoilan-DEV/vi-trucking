import prisma from '../database/client.js';
import { AppError } from '../utils/AppError.js';

export const getAllTariffs = async () => {
    return await prisma.tariff.findMany();
};

export const getTariffById = async (id: number) =>  {
    const tariff = await prisma.tariff.findUnique({ where: {id} });
    if (!tariff) throw new AppError("Tariff Not Found",404);
    return tariff;
};

export const createTariff = async(
    name: string,
    country: string,
    minKm: number,
    maxKm: number | null,
    cargoType: string,
    multiplier: number,
    fixedAmount: number
) => {
    return await prisma.tariff.create({
        data: { name, country, minKm, maxKm, cargoType: cargoType as any, multiplier, fixedAmount },
    });
};

export const updateTariff = async (id: number, data: {
    name?: string;
    country?: string;
    minKm?: number;
    maxKm?: number | null;
    cargoType?: string;
    multiplier?: number;
    fixedAmount?: number;
}) => {
    const tariff = await prisma.tariff.findUnique({ where: {id} });
    if (!tariff) throw new AppError("Tariff Not Found", 404);
    return await prisma.tariff.update({ where: {id}, data: data as any });
};

export const deleteTariff = async (id:number) => {
    const tariff = await prisma.tariff.findUnique({ where: {id} });
    if (!tariff) throw new AppError("Tariff Not Found", 404);
    await prisma.tariff.delete({ where: {id} });
};

// Esta función la va a usar trip.service para calcular el costo
export const findMatchingTariff = async (
  country: string,
  distanceKm: number,
  cargoType: string
) => {
  const tariff = await prisma.tariff.findFirst({
    where: {
      country,
      cargoType: cargoType as any,
      minKm: { lte: distanceKm },
      OR: [
        { maxKm: null },
        { maxKm: { gte: distanceKm } },
      ],
    },
  });

  if (!tariff) throw new AppError('No hay tarifa disponible para este viaje', 400);
  return tariff;
};
