import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'initial' | 'doing' | 'finish';
  dueDate?: Date;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Tiêu đề không được để trống'],
      trim: true
    },
    description: String,
    status: {
      type: String,
      enum: ['initial', 'doing', 'finish'],
      default: 'initial'
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    dueDate: Date
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITask>('Task', TaskSchema, 'tasks');
