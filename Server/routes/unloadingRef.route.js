import express from "express";
import { updateUnloadingRefEntry, getAllUnloadingRefEntries } from "../controllers/unloadingRefree.controller.js";

const router = express.Router();

router.put("/unloadingRef", updateUnloadingRefEntry);
router.get("/get-unloadingRef", getAllUnloadingRefEntries);

export default router;
