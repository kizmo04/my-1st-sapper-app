import Course from '../models/Course';

export default server => {
  server.get('/api/courses/all', async (req, res, next) => {
    console.log('api!')
    try {
      const courses = await Course.find();
      console.log(courses)

      res.json({
        courses
      });
    } catch (error) {
      console.log(error);
    }
  });
};
