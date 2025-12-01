import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const uri = process.env.MONGO_URI;
  const nodeEnv = process.env.NODE_ENV;

  if (!uri || !nodeEnv) {
    throw new Error('Environment variables are missing, check .env file!');
  }

  return {
    uri,
    options: {
      autoIndex: nodeEnv !== 'production',
      retryWrites: true,
      w: 'majority',
      readPreference: 'primary',
      serverSelectionTimeoutMS: 5000,
    },
  };
});
