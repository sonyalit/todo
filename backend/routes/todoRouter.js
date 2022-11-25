const router = require('express').Router();
const { Todo } = require('../db/models');

router.post('/new', async (req, res) => {
  const { todo } = req.body;
  try {
    await Todo.create({
      name: todo.name,
      email: todo.email,
      title: todo.title,
      isDone: todo.isDone,
      updatedByAdmin: false,
    });

    res.status(200).json({ message: 'Задача добавлена' });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});
router.post('/', async (req, res) => {
  const { params } = req.body;
  let todos;
  try {
    if (params.sort) {
      todos = await Todo.findAll({
        offset: params.page <= 1 ? 0 : (params.page - 1) * 3,
        limit: 3,
        order: [[params.sort, 'ASC']],
      });
    } else {
      todos = await Todo.findAll({
        offset: params.page <= 1 ? 0 : (params.page - 1) * 3,
        limit: 3,
      });
    }
    res.status(200).json({ todos });
  } catch ({ message }) {
    res.send(400).json({ message });
  }
});
router.get('/pages', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    const result = Math.ceil(todos.length / 3);
    const pages = [];
    for (let i = 1; i <= result; i += 1) {
      pages.push(i);
    }
    res.status(200).json({ pages });
  } catch ({ message }) {
    res.send(400).json({ message });
  }
});
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const user = res.locals;
  const { newTitle } = req.body;
  try {
    if (user) {
      const todo = await Todo.findOne({
        where: {
          id,
        },
      });
      const updatedTodo = await todo.update({ title: newTitle, updatedByAdmin: true });
      res.status(200).json({ updatedTodo });
    }
  } catch ({ message }) {
    res.send(400).json({ message });
  }
});
router.put('/toggle/:id', async (req, res) => {
  const { id } = req.params;
  const user = res.locals;
  try {
    if (user) {
      const todo = await Todo.findOne({
        where: {
          id,
        },
      });
      const updatedTodo = await todo.update({ isDone: !todo.isDone });
      res.status(200).json({ updatedTodo });
    }
  } catch ({ message }) {
    res.send(400).json({ message });
  }
});

module.exports = router;
