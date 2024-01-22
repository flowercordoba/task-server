import mongoose, { Schema } from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['TaskCompleted', 'TaskRejected', 'TaskInProgress']
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: false
  }
});

const NotificationModel = mongoose.model('Notification', notificationSchema);
export default NotificationModel;
