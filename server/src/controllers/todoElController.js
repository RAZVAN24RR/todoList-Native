const db = require("../models/index");

const Todo = db.todoEs;

const getAllTodoEL = (req, res, next) => {
  res.status(200).json({
    message: "aaaaaaa",
  });
};

const createToDoEl = async (req, res) => {
  try {
    const todo = {
      cont: req.body.cont,
      userId: req.body.userId,
    };
    const data = await Todo.create(todo);
    res.status(200).json({
      message: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (req, res) => {
  try {
    let res = null;
    res = await Todo.destroy({ where: { id: `${req.params.id}` } });
    if (res == req.params.id) {
      res.status(204).json({
        message: "todo deleted",
      });
    } else {
      res.status(404).json({
        message: "fail",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "fail",
    });
  }
};

module.exports = {
  getAllTodoEL,
  createToDoEl,
  deleteTodo,
};
