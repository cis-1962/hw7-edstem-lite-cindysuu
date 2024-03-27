import express, { ErrorRequestHandler } from 'express';  // import express web framework
import dotenv from 'dotenv';  // import dotenv for reading environment variables
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

// import routers
import accountRouter from './routes/account';
import questionRouter from './routes/questions';

// import middleware
import requireAuth from './middlewares/require-auth';

// read environment variables from .env file
dotenv.config();

// define port if exists, or 8000 otherwise
const PORT = process.env.PORT ?? 8000;

// create new express app
const app = express();

// cookie session middleware
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

// connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB: ', err));

// middleware to parse JSON bodies
app.use(express.json());

// import routers
app.use('/api/account', requireAuth, accountRouter);
app.use('/api/question', requireAuth, questionRouter);

// error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
};

app.use(errorHandler);

// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
