const router = require("express").Router();
const authorize = require("../middleware/authorize");
const db = require("../db");
const uuid = require('uuid');



// GET LIST OF ALL TODOS
router.get("/", authorize, async (req, res) => {
    try {
      // const user = await pool.query(
      //   "SELECT user_name FROM users WHERE user_id = $1",
      //   [req.user.id]
      // );
  
      const user = await db.query(
        "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
        [req.user.id]
      );
  
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

// CREATE A TODO
router.post("/todos", authorize, async (req, res) => {
  try {
    // console.log(req.body);
    const { description } = req.body;
    const todoId = uuid.v4(); // Gerar um novo UUID
    const newTodo = await db.query(
      "INSERT INTO todos (todo_id, user_id, description) VALUES ($1, $2, $3) RETURNING *",
      [todoId, req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" }); 
  }
});

// UPDATE A TODO
router.put("/todos/:id", authorize, async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await db.query(
        "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
        [description, id, req.user.id]
      );
  
      if (updateTodo.rows.length === 0) {
        return res.json("This todo is not yours");
      }
  
      res.json("Todo was updated");
    } catch (err) {
      console.error(err.message);
    }
  });


// DELETE A TODO

router.delete("/todos/:id", authorize, async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await db.query(
        "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
        [id, req.user.id]
      );
  
      if (deleteTodo.rows.length === 0) {
        return res.json("This Todo is not yours");
      }
  
      res.json("Todo was deleted");
    } catch (err) {
      console.error(err.message);
    }
  });


module.exports = router;
