import { Router } from "express";

import { UserController } from "./auth.controller.js";

import { verifyToken } from "../../utils/auth.utils.js";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/users", verifyToken, UserController.get);
router.get("/users/:id", verifyToken, UserController.get);
router.put("/users/:id", verifyToken, UserController.update);

export default router;
