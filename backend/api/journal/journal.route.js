import { Router } from "express";

import { JournalController } from "./journal.controller.js";

const router = Router();

router.get("/report", JournalController.getReport);

router.get("/", JournalController.get);
router.get("/:id", JournalController.get);
router.post("/", JournalController.add);
router.put("/:id", JournalController.update);
router.delete("/:id", JournalController.remove);

export default router;
