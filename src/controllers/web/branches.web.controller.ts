import { Request, Response } from 'express';
import * as branchService from '../../services/branch.service.js';

const getUser = (req: Request) => JSON.parse(req.cookies['user'] || '{}');

export const getBranches = async (req: Request, res: Response) => {
  try {
    const branches = await branchService.getAllBranches();
    res.render('pages/branches/index', {
      title: 'Sedes', page: 'branches',
      user: getUser(req), branches, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/dashboard');
  }
};

export const getNewBranch = (req: Request, res: Response) => {
  res.render('pages/branches/form', {
    title: 'Nueva sede', page: 'branches',
    user: getUser(req), branch: null, success: null, error: null,
  });
};

export const postNewBranch = async (req: Request, res: Response) => {
  try {
    const { name, country, city, address } = req.body;
    await branchService.createBranch(name, country, city, address);
    res.redirect('/branches');
  } catch (err: any) {
    res.render('pages/branches/form', {
      title: 'Nueva sede', page: 'branches',
      user: getUser(req), branch: null, error: err.message, success: null,
    });
  }
};

export const getEditBranch = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const branch = await branchService.getBranchById(id);
    res.render('pages/branches/form', {
      title: 'Editar sede', page: 'branches',
      user: getUser(req), branch, success: null, error: null,
    });
  } catch (err: any) {
    res.redirect('/branches');
  }
};

export const postEditBranch = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await branchService.updateBranch(id, req.body);
    res.redirect('/branches');
  } catch (err: any) {
    res.redirect('/branches');
  }
};

export const postDeleteBranch = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await branchService.deleteBranch(id);
    res.redirect('/branches');
  } catch (err: any) {
    res.redirect('/branches');
  }
};