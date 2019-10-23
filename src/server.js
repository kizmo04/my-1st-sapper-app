import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import mongoose from 'mongoose';
import apiRoutes from './apis/routes';
import bodyParser from 'body-parser';
import Course from './apis/models/Course';
import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV, DB_USER, DB_PASSWORD } = process.env;
const dev = NODE_ENV === 'development';
const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds023485.mlab.com:23485/video-test`;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', () => {
  throw new Error('unable to connect to database at ' + DB_URL);
});

db.once('open', () => {
  console.log('connected to database at ' + DB_URL);
});

const server = express(); // You can also use Express
const courseRouter = express.Router();
let routes = express.Router();

server.use(express.static('static'));


// server.use(bodyParser);
// apiRoutes(server);

courseRouter.get('/all', async (req, res, next) => {
  const courses = await Course.find();

  res.json({ courses });
});

routes.use('/courses', courseRouter);


// server
// .use(
//   compression({ threshold: 0 }),
//   sirv('static', { dev }),
//   sapper.middleware()
//   )
//   .listen(PORT, err => {
//     if (err) console.log('error', err);
//   });

server.use('/api', routes);

server.use(sapper.middleware());

server.listen(PORT, err => {
  if (err) console.log('error', err);
})
// console.log(server)
