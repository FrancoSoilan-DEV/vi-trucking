import { Request, Response, NextFunction } from 'express';
import * as tariffService from '../services/tariff.service.js';

export const getAllTariffs = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const tariffs = await tariffService.getAllTariffs();
        res.status(200).json(tariffs);
    } catch (err){
        next(err);
    }
};

export const getTariffById = async (req: Request, res: Response, next:NextFunction) =>{
    try{
        const id = parseInt(req.params['id'] as string);
        const tariff = await tariffService.getTariffById(id);
        res.status(200).json(tariff);
    } catch (err){
        next(err);
    }
};

export const createTariff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, country, minKm, maxKm, cargoType, multiplier, fixedAmount } = req.body;
    const tariff = await tariffService.createTariff(name, country, minKm, maxKm, cargoType, multiplier, fixedAmount);
    res.status(201).json(tariff);
  } catch (err) {
    next(err);
  }
};

export const updateTariff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const tariff = await tariffService.updateTariff(id, req.body);
    res.status(200).json(tariff);
  } catch (err) {
    next(err);
  }
};

export const deleteTariff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await tariffService.deleteTariff(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};