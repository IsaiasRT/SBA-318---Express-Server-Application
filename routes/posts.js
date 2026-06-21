import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
let posts = [];

router.get('/', (req, res) => res.json(posts));

router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.json(post);
});

router.post('/', (req, res) => {
  const post = { ...req.body, id: uuidv4() };
  posts.push(post);
  res.status(201).json(post);
});

router.patch('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  Object.assign(post, req.body);
  res.json(post);
});

router.delete('/:id', (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
