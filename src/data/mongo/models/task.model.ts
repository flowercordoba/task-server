/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema } from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['alta', 'media', 'baja'],
    default: 'media'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  assignedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  ]
});

taskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret, _options) {
    delete ret._id;
    delete ret.password;
  }
});
export const TaskModel = mongoose.model('Task', taskSchema);
