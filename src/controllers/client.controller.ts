import { Request, Response, NextFunction } from 'express';
import * as clientService from '../services/client.service.js';

export const getAllClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json(clients);
  } catch (err) {
    next(err);
  }
};

export const getClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const client = await clientService.getClientById(id);
    res.status(200).json(client);
  } catch (err) {
    next(err);
  }
};

export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyName, industry, country, distanceFromBranchKm, userId } = req.body;
    const client = await clientService.createClient(companyName, industry, country, distanceFromBranchKm, userId);
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const client = await clientService.updateClient(id, req.body);
    res.status(200).json(client);
  } catch (err) {
    next(err);
  }
};

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await clientService.deleteClient(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};