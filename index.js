require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express()
const db = require('./db')
const { router } = require('./api/routes');

const start = async () => {
  try {
    app
      .use(cors())
      .use(morgan('dev'))
      .use(express.json())
    db()
    app
      .get('/', (req, res) => res.send('Welcome to TO DO API with MONGO'))
      .use('/api', router)
      .listen(process.env.EXPRESS_PORT || 2222)
    console.info(`Mongo API running on port ${process.env.EXPRESS_PORT}`)
  } catch (err) {
    throw new Error(`Cannot start server on port ${process.env.EXPRESS_PORT}, ${err}`)
  }
}

start()
