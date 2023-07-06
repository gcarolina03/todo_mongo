const mongoose = require('mongoose')
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

async function connectToDatabase() {
  try {
    await mongoose.connect(`${url}`)
    console.log(`Connected successfully to MongoDB ${url}`);
  } catch(err) {
    console.error('Connection error', err)
  }
}

async function disconnectToDatabase() {
 try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
  }
}

module.exports = { connectToDatabase, disconnectToDatabase }