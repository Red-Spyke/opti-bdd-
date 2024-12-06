import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/post';

const router = Router();

// Créer un post
router.post('/posts', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    next(error);
  }
});

// Lire tous les posts
router.get('/posts', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

// Lire un post par ID
router.get('/posts/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send();
      return;
    }
    res.send(post);
  } catch (error) {
    next(error);
  }
});

// Mettre à jour un post
router.put('/posts/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) {
      res.status(404).send();
      return;
    }
    res.send(post);
  } catch (error) {
    next(error);
  }
});

// Supprimer un post
router.delete('/posts/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
      return;
    }
    res.send(post);
  } catch (error) {
    next(error);
  }
});

export default router;
