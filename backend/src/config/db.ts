import mongoose from 'mongoose';

export let isDbConnected = false;

export const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri || mongoUri.includes('cluster0.xxxxx') || mongoUri.includes('127.0.0.1')) {
    console.log('ℹ️  Checking MongoDB connection...');
  }

  const uriToUse = mongoUri || 'mongodb://127.0.0.1:27017/tododb';

  try {
    const conn = await mongoose.connect(uriToUse, {
      serverSelectionTimeoutMS: 3000,
    });
    isDbConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    isDbConnected = false;
    console.warn(`⚠️  MongoDB Connection failed (${error.message}).`);
    console.warn(`💡 Operating in resilient in-memory mode until a valid MONGO_URI is supplied in backend/.env`);
  }
};
