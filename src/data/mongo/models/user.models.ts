/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  emailValidated: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  img: {
    type: String
  },
  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  }
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret, _options) {
    delete ret._id;
    delete ret.password;
  }
});

export const UserModel = mongoose.model('User', userSchema);
