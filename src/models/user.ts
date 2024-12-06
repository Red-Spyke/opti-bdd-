import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  projectId: string;
  title: string;
  dueDate: Date;
}

const UserSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  title: { type: String, required: true },
  dueDate: { type: Date, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);
