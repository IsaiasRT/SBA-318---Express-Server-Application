import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
let comments = [];

router.get('/', (req, res) => res.json(comments));

router.get('/:id', (req, res) => {
  const comment = comments.find(p => p.id === req.params.id);
  res.json(comment);
});

router.post('/', (req, res) => {
  const comment = { ...req.body, id: uuidv4() };
  comments.push(comment);
  res.status(201).json(comment);
});

router.patch('/:id', (req, res) => {
  const comment = comments.find(p => p.id === req.params.id);
  Object.assign(comment, req.body);
  res.json(comment);
});

router.delete('/:id', (req, res) => {
  comments = comments.filter(p => p.id !== req.params.id);
  res.json({ message: 'Deleted' });
});

export { comments };
export default router;
