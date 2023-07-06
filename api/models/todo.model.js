const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
  title: { 
    type: String,
    required: true 
  },
  done: { 
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
},
{ timestamps: false },
)

const todoModel = mongoose.model('todo', TodoSchema)
module.exports = todoModel