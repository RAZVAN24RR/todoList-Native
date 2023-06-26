const todoElController = require("../controllers/todoElController.js");

const router = require("express").Router();

router.get("/getAllTodoEL", todoElController.getAllTodoEL);

router.post("/createTodoEl", todoElController.createToDoEl);

router.delete("/deleteTodoEl/:id", todoElController.deleteTodo);
module.exports = router;
