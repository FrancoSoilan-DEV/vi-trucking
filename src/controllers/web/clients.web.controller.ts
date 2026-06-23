import { Request, Response } from 'express';
import * as clientService from '../../services/client.service.js';
import * as userService from '../../services/user.service.js';

const getUser = (req: Request) => JSON.parse(req.cookies['user'] || '{}');

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.getAllClients();
    res.render('pages/clients/index', {
      title: 'Clientes', page: 'clients',
      user: getUser(req), clients, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/dashboard');
  }
};

export const getNewClient = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.render('pages/clients/form', {
      title: 'Nuevo cliente', page: 'clients',
      user: getUser(req), client: null, users, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/clients');
  }
};

export const postNewClient = async (req: Request, res: Response) => {
  try {
    const { companyName, industry, country, distanceFromBranchKm, userId } = req.body;
    await clientService.createClient(companyName, industry, country, parseFloat(distanceFromBranchKm), parseInt(userId));
    res.redirect('/clients');
  } catch (err: any) {
    const users = await userService.getAllUsers();
    res.render('pages/clients/form', {
      title: 'Nuevo cliente', page: 'clients',
      user: getUser(req), client: null, users, error: err.message, success: null,
    });
  }
};

export const getEditClient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const [client, users] = await Promise.all([
      clientService.getClientById(id),
      userService.getAllUsers(),
    ]);
    res.render('pages/clients/form', {
      title: 'Editar cliente', page: 'clients',
      user: getUser(req), client, users, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/clients');
  }
};

export const postEditClient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await clientService.updateClient(id, req.body);
    res.redirect('/clients');
  } catch (err: any) {
    res.redirect('/clients');
  }
};

export const postDeleteClient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await clientService.deleteClient(id);
    res.redirect('/clients');
  } catch (err: any) {
    res.redirect('/clients');
  }
};