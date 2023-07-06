const mongoose = require('mongoose')
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
async function db() {
  try {
    await mongoose.connect(`${url}`)
    console.log(`Connected successfully to server ${url}`);
  } catch(err) {
    console.error('Connection error', err)
  }
}

module.exports = db