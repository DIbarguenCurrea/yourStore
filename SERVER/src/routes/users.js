const { Router } = require("express");
const {
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users");

const usersRouter = Router();

usersRouter.post("/register", registerUser);
usersRouter.put("/update/:id", updateUser);
usersRouter.delete("/delete/:id", deleteUser);
usersRouter.post("/login", loginUser);

module.exports = usersRouter;
