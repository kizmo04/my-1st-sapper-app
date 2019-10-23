import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image_url: String,
  description: String,
  content: [{
    module: String,
    clips: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clip'
    }]
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default mongoose.model('Course', CourseSchema);
