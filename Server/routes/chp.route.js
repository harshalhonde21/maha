import express from "express";
import {
    registerChpEntry,
    getAllChpEntries,
    updateChpEntry,
    getAllChpEntriesPlain
} from "../controllers/chp.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkIpAccess } from "../middlewares/secure.middleware.js";

const router = express.Router();

router.route("/chp-entry").post(isAuthenticated, registerChpEntry);
router.route("/get-chp-entry").get(getAllChpEntries);
router.route("/chp-entry").get(getAllChpEntriesPlain);
router.put('/chpUpdate/:id', updateChpEntry);

export default router;
