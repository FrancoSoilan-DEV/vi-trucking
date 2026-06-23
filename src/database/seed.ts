import prisma from './client.js';
import bcrypt from 'bcrypt';

const seed = async () => {
  console.log('🌱 Iniciando seed...');

  const existing = await prisma.user.findFirst({ where: { role: 'SUPERADMIN' } });
  if (existing) {
    console.log('✅ Ya existe un superadmin, saltando seed...');
    await prisma.$disconnect();
    return;
  }

  const hash = (pwd: string) => bcrypt.hash(pwd, 10);

  // ─── USUARIOS ───────────────────────────────────────────
  const superadmin = await prisma.user.create({
    data: { name: 'Super Admin', email: 'admin@vitrucking.com', password: await hash('admin123'), role: 'SUPERADMIN' }
  });

  const adminUser = await prisma.user.create({
    data: { name: 'Carlos Mendoza', email: 'carlos@vitrucking.com', password: await hash('admin123'), role: 'ADMIN' }
  });

  const driverUser1 = await prisma.user.create({
    data: { name: 'Roberto Díaz', email: 'roberto@vitrucking.com', password: await hash('driver123'), role: 'DRIVER' }
  });

  const driverUser2 = await prisma.user.create({
    data: { name: 'Miguel Torres', email: 'miguel@vitrucking.com', password: await hash('driver123'), role: 'DRIVER' }
  });

  const driverUser3 = await prisma.user.create({
    data: { name: 'Juan Pérez', email: 'juan@vitrucking.com', password: await hash('driver123'), role: 'DRIVER' }
  });

  const clientUser1 = await prisma.user.create({
    data: { name: 'Ana García', email: 'ana@exportaciones.com', password: await hash('client123'), role: 'CLIENT' }
  });

  const clientUser2 = await prisma.user.create({
    data: { name: 'Pedro Ruiz', email: 'pedro@constructora.com', password: await hash('client123'), role: 'CLIENT' }
  });

  console.log('✅ Usuarios creados');

  // ─── SEDES ──────────────────────────────────────────────
  const branch1 = await prisma.branch.create({
    data: { name: 'Sede Central Asunción', country: 'Paraguay', city: 'Asunción', address: 'Av. España 1234' }
  });

  const branch2 = await prisma.branch.create({
    data: { name: 'Sede Ciudad del Este', country: 'Paraguay', city: 'Ciudad del Este', address: 'Av. Monseñor Rodríguez 567' }
  });

  console.log('✅ Sedes creadas');

  // ─── CONDUCTORES ────────────────────────────────────────
  const driver1 = await prisma.driver.create({
    data: { license: 'LIC-001-PY', userId: driverUser1.id }
  });

  const driver2 = await prisma.driver.create({
    data: { license: 'LIC-002-PY', userId: driverUser2.id }
  });

  const driver3 = await prisma.driver.create({
    data: { license: 'LIC-003-PY', userId: driverUser3.id }
  });

  console.log('✅ Conductores creados');

  // ─── VEHÍCULOS ──────────────────────────────────────────
  const vehicle1 = await prisma.vehicle.create({
    data: {
      plate: 'ABC-123', brand: 'Scania', model: 'R450', year: 2021,
      maxCapacityKg: 25000, totalKm: 45000, totalTrips: 32,
      lastMaintenance: new Date('2024-11-15'),
      licenseExpiryDate: new Date('2025-12-31'),
      driverId: driver1.id, branchId: branch1.id
    }
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      plate: 'DEF-456', brand: 'Volvo', model: 'FH16', year: 2020,
      maxCapacityKg: 30000, totalKm: 72000, totalTrips: 58,
      lastMaintenance: new Date('2024-10-20'),
      licenseExpiryDate: new Date('2025-08-15'),
      driverId: driver2.id, branchId: branch1.id
    }
  });

  const vehicle3 = await prisma.vehicle.create({
    data: {
      plate: 'GHI-789', brand: 'Mercedes-Benz', model: 'Actros', year: 2022,
      maxCapacityKg: 22000, totalKm: 18000, totalTrips: 14,
      lastMaintenance: new Date('2024-12-01'),
      licenseExpiryDate: new Date('2026-03-20'),
      driverId: driver3.id, branchId: branch2.id
    }
  });

  console.log('✅ Vehículos creados');

  // ─── CLIENTES ───────────────────────────────────────────
  const client1 = await prisma.client.create({
    data: {
      companyName: 'Exportaciones del Sur S.A.', industry: 'Agro-exportación',
      country: 'Paraguay', distanceFromBranchKm: 45,
      totalOrders: 12, totalTrucksSent: 15, totalRevenue: 180000,
      userId: clientUser1.id
    }
  });

  const client2 = await prisma.client.create({
    data: {
      companyName: 'Constructora Nacional', industry: 'Construcción',
      country: 'Paraguay', distanceFromBranchKm: 120,
      totalOrders: 8, totalTrucksSent: 10, totalRevenue: 95000,
      userId: clientUser2.id
    }
  });

  console.log('✅ Clientes creados');

  // ─── TARIFAS ────────────────────────────────────────────
  const tariff1 = await prisma.tariff.create({
    data: { name: 'Local hasta 100km - General', country: 'Paraguay', minKm: 0, maxKm: 100, cargoType: 'GENERAL', multiplier: 1.0, fixedAmount: 500 }
  });

  const tariff2 = await prisma.tariff.create({
    data: { name: 'Local +100km - General', country: 'Paraguay', minKm: 100, maxKm: null, cargoType: 'GENERAL', multiplier: 1.3, fixedAmount: 800 }
  });

  const tariff3 = await prisma.tariff.create({
    data: { name: 'Local - Carga Pesada', country: 'Paraguay', minKm: 0, maxKm: null, cargoType: 'HEAVY', multiplier: 1.8, fixedAmount: 1200 }
  });

  const tariff4 = await prisma.tariff.create({
    data: { name: 'Local - Mercadería Frágil', country: 'Paraguay', minKm: 0, maxKm: null, cargoType: 'FRAGILE', multiplier: 1.5, fixedAmount: 600 }
  });

  console.log('✅ Tarifas creadas');

  // ─── VIAJES ─────────────────────────────────────────────
  const trip1 = await prisma.trip.create({
    data: {
      origin: 'Asunción', destination: 'Encarnación',
      distanceKm: 370, departureAt: new Date('2025-01-10T08:00:00'),
      status: 'COMPLETED', baseAmount: 5000,
      finalCost: 5000 * tariff2.multiplier + tariff2.fixedAmount,
      driverId: driver1.id, vehicleId: vehicle1.id,
      clientId: client1.id, branchId: branch1.id,
      tariffId: tariff2.id, userId: clientUser1.id,
      cargo: { create: { type: 'GENERAL', weightKg: 18000, description: 'Granos de soja' } },
      payment: { create: { amount: 5000 * tariff2.multiplier + tariff2.fixedAmount, paid: true, paidAt: new Date('2025-01-12') } }
    }
  });

  const trip2 = await prisma.trip.create({
    data: {
      origin: 'Asunción', destination: 'Ciudad del Este',
      distanceKm: 320, departureAt: new Date('2025-01-15T07:00:00'),
      status: 'COMPLETED', baseAmount: 8000,
      finalCost: 8000 * tariff3.multiplier + tariff3.fixedAmount,
      driverId: driver2.id, vehicleId: vehicle2.id,
      clientId: client2.id, branchId: branch1.id,
      tariffId: tariff3.id, userId: clientUser2.id,
      cargo: { create: { type: 'HEAVY', weightKg: 28000, description: 'Materiales de construcción' } },
      payment: { create: { amount: 8000 * tariff3.multiplier + tariff3.fixedAmount, paid: true, paidAt: new Date('2025-01-17') } }
    }
  });

  const trip3 = await prisma.trip.create({
    data: {
      origin: 'Ciudad del Este', destination: 'Asunción',
      distanceKm: 320, departureAt: new Date('2025-02-01T06:00:00'),
      status: 'IN_PROGRESS', baseAmount: 4500,
      finalCost: 4500 * tariff4.multiplier + tariff4.fixedAmount,
      driverId: driver3.id, vehicleId: vehicle3.id,
      clientId: client1.id, branchId: branch2.id,
      tariffId: tariff4.id, userId: clientUser1.id,
      cargo: { create: { type: 'FRAGILE', weightKg: 5000, description: 'Equipos electrónicos' } },
      payment: { create: { amount: 4500 * tariff4.multiplier + tariff4.fixedAmount, paid: false } }
    }
  });

  const trip4 = await prisma.trip.create({
    data: {
      origin: 'Asunción', destination: 'Concepción',
      distanceKm: 220, departureAt: new Date('2025-02-10T09:00:00'),
      status: 'PENDING', baseAmount: 3500,
      finalCost: 3500 * tariff2.multiplier + tariff2.fixedAmount,
      driverId: driver1.id, vehicleId: vehicle1.id,
      clientId: client2.id, branchId: branch1.id,
      tariffId: tariff2.id, userId: clientUser2.id,
      cargo: { create: { type: 'GENERAL', weightKg: 12000, description: 'Mercadería general' } },
      payment: { create: { amount: 3500 * tariff2.multiplier + tariff2.fixedAmount, paid: false } }
    }
  });

  console.log('✅ Viajes creados');

  console.log('\n🎉 Seed completado!');
  console.log('─────────────────────────────');
  console.log('👤 Superadmin: admin@vitrucking.com / admin123');
  console.log('👤 Admin:      carlos@vitrucking.com / admin123');
  console.log('🚛 Conductor 1: roberto@vitrucking.com / driver123');
  console.log('🚛 Conductor 2: miguel@vitrucking.com / driver123');
  console.log('🚛 Conductor 3: juan@vitrucking.com / driver123');
  console.log('🏭 Cliente 1:  ana@exportaciones.com / client123');
  console.log('🏭 Cliente 2:  pedro@constructora.com / client123');
  console.log('─────────────────────────────');

  await prisma.$disconnect();
};

seed().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});