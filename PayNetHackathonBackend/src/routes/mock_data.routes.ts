import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/user1/maybank-account', (req: Request, res: Response) => {
  res.status(201).json({
    data: {
      accountNumber: '52901234882',
      balance: 120000,
      currency: 'MYR',
    },
  });
});

export default router;