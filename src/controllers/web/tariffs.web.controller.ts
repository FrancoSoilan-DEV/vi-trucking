import { Request, Response } from 'express';
import * as tariffService from '../../services/tariff.service.js';

const getUser = (req: Request) => JSON.parse(req.cookies['user'] || '{}');

export const getTariffs = async (req: Request, res: Response) => {
  try {
    const tariffs = await tariffService.getAllTariffs();
    res.render('pages/tariffs/index', {
      title: 'Tarifas', page: 'tariffs',
      user: getUser(req), tariffs, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/dashboard');
  }
};

export const getNewTariff = (req: Request, res: Response) => {
  res.render('pages/tariffs/form', {
    title: 'Nueva tarifa', page: 'tariffs',
    user: getUser(req), tariff: null, success: null, error: null,
  });
};

export const postNewTariff = async (req: Request, res: Response) => {
  try {
    const { name, country, minKm, maxKm, cargoType, multiplier, fixedAmount } = req.body;
    await tariffService.createTariff(name, country, parseFloat(minKm), maxKm ? parseFloat(maxKm) : null, cargoType, parseFloat(multiplier), parseFloat(fixedAmount));
    res.redirect('/tariffs');
  } catch (err: any) {
    res.render('pages/tariffs/form', {
      title: 'Nueva tarifa', page: 'tariffs',
      user: getUser(req), tariff: null, error: err.message, success: null,
    });
  }
};

export const getEditTariff = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const tariff = await tariffService.getTariffById(id);
    res.render('pages/tariffs/form', {
      title: 'Editar tarifa', page: 'tariffs',
      user: getUser(req), tariff, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/tariffs');
  }
};

export const postEditTariff = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await tariffService.updateTariff(id, req.body);
    res.redirect('/tariffs');
  } catch (err: any) {
    res.redirect('/tariffs');
  }
};

export const postDeleteTariff = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await tariffService.deleteTariff(id);
    res.redirect('/tariffs');
  } catch (err: any) {
    res.redirect('/tariffs');
  }
};