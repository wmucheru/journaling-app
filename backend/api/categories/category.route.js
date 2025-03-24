import { Router } from "express";

import { CategoryController } from "./category.controller.js";

const router = Router();

router.get("/", CategoryController.get);
router.get("/:id", CategoryController.get);
router.post("/", CategoryController.add);
router.put("/", CategoryController.update);
router.delete("/:id", CategoryController.remove);

export default router;
