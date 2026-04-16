const { Router } = require("express");
const {
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
} = require("../controllers/users");

const usersRouter = Router();
const verifyToken = require("../middleware/auth");

usersRouter.post("/register", registerUser);
usersRouter.put("/profile", verifyToken, updateUser);
usersRouter.delete("/delete/:id", deleteUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/profile", verifyToken, getProfile);

module.exports = usersRouter;
