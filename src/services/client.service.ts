import prisma from '../database/client.js';
import { AppError } from '../utils/AppError.js';

export const getAllClients = async () => {
  return await prisma.client.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } }
    }
  });
};

export const getClientById = async (id: number) => {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } }
    }
  });

  if (!client) throw new AppError('Cliente no encontrado', 404);
  return client;
};

export const createClient = async (
  companyName: string,
  industry: string,
  country: string,
  distanceFromBranchKm: number,
  userId: number
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError('Usuario no encontrado', 404);

  const existing = await prisma.client.findUnique({ where: { userId } });
  if (existing) throw new AppError('Este usuario ya tiene un perfil de cliente', 400);

  return await prisma.client.create({
    data: { companyName, industry, country, distanceFromBranchKm, userId },
  });
};

export const updateClient = async (id: number, data: {
  companyName?: string;
  industry?: string;
  country?: string;
  distanceFromBranchKm?: number;
  totalOrders?: number;
  totalTrucksSent?: number;
  totalRevenue?: number;
}) => {
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) throw new AppError('Cliente no encontrado', 404);

  return await prisma.client.update({ where: { id }, data });
};

export const deleteClient = async (id: number) => {
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) throw new AppError('Cliente no encontrado', 404);

  await prisma.client.delete({ where: { id } });
};