import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  name: string;
  description: string;
  status: string;
}

const PostSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "planned" }
});

export default mongoose.model<IPost>('Post', PostSchema);
