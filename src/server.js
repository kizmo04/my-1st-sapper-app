import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import mongoose from 'mongoose';
import apiRoutes from './apis/routes';
import bodyParser from 'body-parser';
import Course from './apis/models/Course';
import Clip from './apis/models/Clip';
import dotenv from 'dotenv';
import Note from './apis/models/Note';

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

server.use(bodyParser());

const courseRouter = express.Router();
const clipRouter = express.Router();
const noteRouter = express.Router();
let routes = express.Router();

server.use(express.static('static'));

noteRouter.get('/all', async(req, res, next) => {
  const notes = await Note.find({});

  res.json({ notes });
});

noteRouter.post('/new', async(req, res, next) => {
  const { clip_timestamp, content } = req.body;

  const newNote = new Note({
    clip_timestamp,
    content
  });

  await newNote.save();

  res.json({
    note: newNote
  });
});

courseRouter.get('/all', async (req, res, next) => {
  const courses = await Course.find();

  res.json({ courses });
});

clipRouter.post('/new', async (req, res, next) => {
  const newClip = new Clip({
    vimeo_id: req.body.vimeo_id
  });

  await newClip.save();

  const newCourse = new Course({
    title: '피카츄 과정',
    price: 123234556,
    image_url: 'https://secure.img1-fg.wfcdn.com/im/02238154/compr-r85/8470/84707680/pokemon-pikachu-wall-decal.jpg',
    description: '피카츄가 되는 그 날까지 끝까지 책임지겠습니다.',
    content: [{
      module: '전기 생산 기초'
    }]
  });

  newCourse.content[0].clips.push(newClip);

  await newCourse.save();
});

routes.use('/notes', noteRouter);
routes.use('/courses', courseRouter);
routes.use('/clips', clipRouter);



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
});
