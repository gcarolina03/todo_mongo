const router = require('express').Router()
const { createTodo, getTodos, getTodo, deleteTodo, updateTodoStatus, getAllUserTodos } = require('../controllers/todo.controller')

router.get('/', getTodos)
router.get('/:id', getTodo)
router.get('/user/:userId', getAllUserTodos)

router.post('/', createTodo)

router.delete('/:id', deleteTodo);

router.put('/:id', updateTodoStatus);

module.exports = router