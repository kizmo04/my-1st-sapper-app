import mongoose from 'mongoose';
import { online } from '@vanillacoding/models';

const { schema, options } = online.Course;
const CourseSchema = new mongoose.Schema(schema, options);

export default mongoose.model('Course', CourseSchema);
