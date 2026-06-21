import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import createError from './utilities/error.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

const requestTimer = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} — ${duration}ms`);
  });
  next();
};

app.use(logger);
app.use(requestTimer);

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  console.log('[TEST]!');

  res.send('Hello from Homepage.');
});

app.use((req, res, next) => {
  next(createError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { status: err.status || 500, message: err.message } });
});

app.listen(PORT, () => console.log(`server running on port: http://localhost:${PORT}`));
