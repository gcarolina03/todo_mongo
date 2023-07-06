const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { 
    type: String,
    required: true 
  },
  email: { 
    type: String,
    required: true 
  },
  password: { 
    type: String,
    required: true 
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'todos'
  }]
},
{ timestamps: false },
)

const userModel = mongoose.model('user', UserSchema)
module.exports = userModel