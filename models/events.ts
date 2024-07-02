import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  registeredUsers: mongoose.Types.ObjectId[];
  status: 'upcoming' | 'ongoing' | 'past';
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['upcoming', 'ongoing', 'past'], required: true },
});

const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
export default Event;