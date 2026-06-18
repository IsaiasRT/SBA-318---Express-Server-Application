import express from 'express';

const router = express.Router();

// routes start with /users
router.get('/', (req, res) => {
 res.send('Hello');
 
});

export default router;

