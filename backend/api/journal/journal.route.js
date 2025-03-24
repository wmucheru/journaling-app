import { Router } from "express";

import { SpeakerController } from "./speaker.controller.js";

const router = Router();

router.get("/", SpeakerController.get);
router.get("/:id", SpeakerController.get);
router.post("/", SpeakerController.add);
router.put("/", SpeakerController.update);
router.delete("/:id", SpeakerController.remove);

export default router;
