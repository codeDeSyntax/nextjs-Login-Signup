import mongoose from 'mongoose';

const MONGODB_URI ='mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.4';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

let connection: mongoose.Connection | null = null;

async function connectToDatabase(): Promise<mongoose.Connection> {
  if (connection) {
    return connection;
  }

  try {
    const mongooseInstance = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    
    connection = mongooseInstance.connection;
    
    console.log('Successfully connected to MongoDB');
    
    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    
    process.on('SIGINT', async () => {
      if (connection) {
        await connection.close();
        console.log('MongoDB connection closed due to application termination');
        process.exit(0);
      }
    });

    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;