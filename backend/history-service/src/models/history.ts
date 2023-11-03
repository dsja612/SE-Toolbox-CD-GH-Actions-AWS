import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },
  attempts: [
    {
      questionId: {
        type: Number
      },
      timestamp: {
        type: String
      }
    }
  ],
  total: {
    type: Number,
  },
  easy: {
    type: Number,
  },
  medium: {
    type: Number,
  },
  hard: {
    type: Number,
  }
});

export const HistoryModel = mongoose.model('History', HistorySchema);
