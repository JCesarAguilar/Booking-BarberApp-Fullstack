import { Request, Response, NextFunction } from 'express';

type Params = { id: string };

export const validateIdParam = (req: Request<Params>, res: Response, next: NextFunction): void => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0) {
    res.status(400).json({ message: 'ID inválido: el ID debe ser un número mayor a 0' });
    return;
  }

  next();
};
