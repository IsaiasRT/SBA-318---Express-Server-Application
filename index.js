import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  console.log('[TEST]!');

  res.send('Hello from Homepage.');
});

app.listen(PORT, () => console.log(`server running on port: http://localhost:${PORT}`));
