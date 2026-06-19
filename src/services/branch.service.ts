import prisma from '../database/client.js';
import { AppError } from '../utils/AppError.js';

export const getAllBranches = async () => {
  return await prisma.branch.findMany();
};

export const getBranchById = async (id: number) => {
  const branch = await prisma.branch.findUnique({ where: { id } });
  if (!branch) throw new AppError('Sede no encontrada', 404);
  return branch;
};

export const createBranch = async (name: string, country: string, city: string, address: string) => {
  return await prisma.branch.create({
    data: { name, country, city, address },
  });
};

export const updateBranch = async (id: number, data: { name?: string; country?: string; city?: string; address?: string }) => {
  const branch = await prisma.branch.findUnique({ where: { id } });
  if (!branch) throw new AppError('Sede no encontrada', 404);

  return await prisma.branch.update({
    where: { id },
    data,
  });
};

export const deleteBranch = async (id: number) => {
  const branch = await prisma.branch.findUnique({ where: { id } });
  if (!branch) throw new AppError('Sede no encontrada', 404);

  await prisma.branch.delete({ where: { id } });
};