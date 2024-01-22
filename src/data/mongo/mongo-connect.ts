import mongoose from 'mongoose';

import { Options } from '../interfaces/Index';

export class MongoDatabase {
  static async connect(options: Options) {
    const { dbName, mongoUri } = options;

    try {
      await mongoose.connect(mongoUri, {
        dbName: dbName
      });
   
      return true;
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }
  }
  static async disconnect() {
    await mongoose.disconnect();
  }
}
