const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Todo = require('../models/todo.model')

const createUser = async (req, res) => {
  try {
    // password is encrypted
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    // user is created
    const user = new User(req.body)
    await user.save()
    return res.status(200).json({ user })
  } catch (err) {
    return res.status(500).send({ err, message: 'User not created!' })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, data: users })
  } catch (err) {
    res.status(500).send({err, message: 'Users not found!'})
  }
}

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json({ user })
  } catch (err) {
    return res.status(500).json({err, message: 'User not found!'})
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) return res.status(404).json({ error: 'User not found' })

    await Todo.deleteMany({ userId: req.params.id })
    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ err, message: 'Failed to delete user' })
  }
}

const updateUser = async (req, res) => {
  try {
    // password is encrypted
    if(req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10)

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json({ user })
  } catch (err) {
    return res.status(500).json({ err, message: 'Failed to update user' })
  }
}

module.exports = { createUser, getUsers, getOneUser, deleteUser, updateUser }