const Todo = require('../models/todo.model')
const User = require('../models/user.model')


const createTodo = async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findById(req.body.userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    // Create a new todo
    const todo = new Todo(req.body)
    await todo.save()

    // Add the todo to the user's todos array
    user.todos.push(todo._id);
    await user.save()

    return res.status(200).json({ todo })
  } catch (err) {
    return res.status(500).json({ err, message: 'Todo not created' })
  }
}

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find()
    return res.status(200).json({ success: true, data: todos })
  } catch (err) {
    return res.status(500).json({ err, message: 'Todos not found' })
  }
}

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)

    if (!todo) return res.status(404).json({ err, message: 'Todo not found' })

    return res.status(200).json({ todo })
  } catch (error) {
    return res.status(500).json({err, message: 'Todo not found!'})
  }
}

const deleteTodo = async (req, res) => {
  try {
    // Find the todo by ID and remove it
    const todo = await Todo.findByIdAndRemove(req.params.id)

    if (!todo) return res.status(404).json({ error: 'Todo not found' })

    return res.status(200).json({ message: 'Todo deleted successfully' })
  } catch (err) {
    return res.status(500).json({ err, message: 'Failed to delete todo' })
  }
}

const updateTodoStatus = async (req, res) => {
  try {
    // Find the todo by ID and update its status
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { done: req.body.done },
      { new: true }
    )

    if (!todo) return res.status(404).json({ error: 'Todo not found' })

    return res.status(200).json({ todo });
  } catch (err) {
    return res.status(500).json({ err, message: 'Failed to update todo' });
  }
}

const getAllUserTodos = async (req, res) => {
  try {
    // Find all todos of the specified user
    const todos = await Todo.find({ userId: req.params.userId });

    return res.status(200).json({ success: true, data: todos })
  } catch (error) {
    return res.status(500).json({ err, message: 'Todos not found' })
  }
}

module.exports = { createTodo, getTodos, getTodo, deleteTodo, updateTodoStatus, getAllUserTodos }