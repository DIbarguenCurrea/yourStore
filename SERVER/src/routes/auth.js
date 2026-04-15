const { Router } = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/users");
const verifyToken = require("../middleware/auth");

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/profile", verifyToken, getProfile);

module.exports = authRouter;
