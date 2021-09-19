const {
  addTodo,
  getAllTodos,
  getDoneTodo,
  getUndoneTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/todo");
const router = require("express").Router();

router.post("/todo", addTodo);
router.get("/todos", getAllTodos);
router.get("/todo/done", getDoneTodo);
router.get("/todo/undone", getUndoneTodo);
router.patch("/todo/:id/:action", updateTodo);
router.delete("/todo/:id", deleteTodo);

module.exports = router;
