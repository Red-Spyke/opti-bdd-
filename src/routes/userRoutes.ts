import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/user';

const router = Router();

// Créer un user
router.post('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

// Lire tous les users
router.get('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// Lire un user par ID
router.get('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send();
      return;
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Mettre à jour un user
router.put('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      res.status(404).send();
      return;
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Supprimer un user
router.delete('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
      return;
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

export default router;
