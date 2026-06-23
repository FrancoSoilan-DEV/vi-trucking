import { Request, Response } from 'express';
import prisma from '../../database/client.js';

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const [vehicles, drivers, clients, trips] = await Promise.all([
      prisma.vehicle.count(),
      prisma.driver.count(),
      prisma.client.count(),
      prisma.trip.count(),
    ]);

    const recentTrips = await prisma.trip.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        driver: { include: { user: { select: { name: true } } } },
        client: true,
      }
    });

    const user = JSON.parse(req.cookies['user'] || '{}');

    res.render('pages/dashboard/index', {
      title: 'Dashboard',
      page: 'dashboard',
      user,
      stats: { vehicles, drivers, clients, trips },
      recentTrips,
      success: null,
      error: null,
    });
  } catch (err: any) {
    res.redirect('/auth/login');
  }
};