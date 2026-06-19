import { Request, Response, NextFunction } from 'express';
import * as branchService from '../services/branch.service';

export const getAllBranches = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const branches = await branchService.getAllBranches();
        res.status(200).json(branches)
    } catch (err){
        next(err);
    }
};

export const getBranchById = async (req:Request, res:Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params['id'] as string);
        const branch = await branchService.getBranchById(id);
        res.status(200).json(branch);
    } catch (err){
        next(err);
    }
};

export const updateBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const branch = await branchService.updateBranch(id, req.body);
    res.status(200).json(branch);
  } catch (err) {
    next(err);
  }
};

export const deleteBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params['id'] as string);
    await branchService.deleteBranch(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
