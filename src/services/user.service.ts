import prisma from '../database/client.js';
import { AppError } from '../utils/AppError.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) throw new AppError('Usuario no encontrado', 404);

  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError('El email ya está registrado', 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: { name, email, password: hashedPassword, role: role as any },
    select: { id: true, name: true, email: true, role: true },
  });
};

export const updateUser = async (id: number, data: { name?: string; email?: string; role?: string }) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError('Usuario no encontrado', 404);

  return await prisma.user.update({
    where: { id },
    data: data as any,
    select: { id: true, name: true, email: true, role: true },
  });
};

export const deleteUser = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError('Usuario no encontrado', 404);

  await prisma.user.delete({ where: { id } });
};