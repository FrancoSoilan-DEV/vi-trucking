import prisma from '../database/client.js';
import { AppError } from '../utils/AppError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../config/env.js';

export const login = async (email: string, password: string) => {
  // 1. Buscar el usuario por email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError('Incorrect email or password', 401);
  }

  // 2. Verificar la contraseña
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError('Incorrect email or password', 401);
  }

  // 3. Generar el JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: '8h' }
  ); 

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

export const register = async (name: string, email: string, password: string, role: string) => {
  // 1. Verificar si el email ya existe
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new AppError('The email address is already registered', 400);
  }

  // 2. Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Crear el usuario
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: role as any },
  });

  return { id: user.id, name: user.name, email: user.email, role: user.role };
};