const router = require('express').Router()
const userRouter = require('./user.router')
const todoRouter = require('./todo.router')

router.use('/users', userRouter)
router.use('/todos', todoRouter)

module.exports = { router }