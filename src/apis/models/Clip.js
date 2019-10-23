import mongoose from 'mongoose';

const ClipSchema = new mongoose.Schema({
  vimeo_id: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default mongoose.model('Clip', ClipSchema);
