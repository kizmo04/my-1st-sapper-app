import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  clip_timestamp: String,
  content: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default mongoose.model('Note', NoteSchema);
