import express from 'express';
import userRoutes, { users } from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import createError from './utilities/error.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

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
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.get('/', (req, res) => {
  console.log('[TEST]!');
  res.send('Hello from Homepage.');
});

app.get('/users-view', (req, res) => {
  res.render('users', { users });
});

app.use((req, res, next) => {
  next(createError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { status: err.status || 500, message: err.message } });
});

app.listen(PORT, () => console.log(`server running on port: http://localhost:${PORT}`));  
