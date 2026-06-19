import prisma from '../database/client.js'
import { AppError } from '../utils/AppError.js'

export const getAllDrivers = async () => {
    return await prisma.driver.findMany({
        include: {
            user: {
                select: {id:true, name:true, email:true}
            },
            vehicle:true,
        }
    });
};

export const getDriverById = async (id:number) => {
    const driver = await prisma.driver.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id:true,
                    name:true,
                    email:true,
                }
            },
            vehicle: true,
        }
    });
    if (!driver) throw new AppError('Driver Not Found',404);
    return driver;
};

export const createDriver = async (license: string, userId: number) => {
    const existing = await prisma.driver.findUnique({ where: { license } });
    if (existing) throw new AppError('La licencia ya esta agregada', 400);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError('User Not Fount',404);

    return await prisma.driver.create({
        data: { license, userId },
    });
};

export const updateDriver = async ( id:number, data: {license?:string})=>{
    const driver = await prisma.driver.findUnique({ where: { id } });
    if (!driver) throw new AppError("Driver Not Fount", 404);

    return await prisma.driver.update({
        where: { id },
        data,
    });
};

export const deleteDriver = async (id: number) => {
  const driver = await prisma.driver.findUnique({ where: { id } });
  if (!driver) throw new AppError('Conductor no encontrado', 404);

  await prisma.driver.delete({ where: { id } });
};
