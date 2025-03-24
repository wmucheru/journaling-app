import { Router } from "express";

import { JournalController } from "./journal.controller.js";

const router = Router();

router.get("/", JournalController.get);
router.get("/:id", JournalController.get);
router.post("/", JournalController.add);
router.put("/", JournalController.update);
router.delete("/:id", JournalController.remove);

export default router;
