import mongoose, { Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { compare } from 'bcrypt';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    matchPassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
},
{
  timestamps: true,
});

// Add the matchPassword method here
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await compare(enteredPassword, this.password);
  };

const User: Model<IUser> = mongoose.models.EventViewer || mongoose.model('EventViewer', UserSchema);

export default User;