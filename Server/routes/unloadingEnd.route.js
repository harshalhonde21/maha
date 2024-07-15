import express from 'express';
import { updateUnloadingEndTpsEntry, getAllUnloadingEndTpsEntries, proforma06 } from '../controllers/unloadingEnd.controller.js';

const router = express.Router();

router.put('/unloadingEndAddUpdate', updateUnloadingEndTpsEntry);
router.get('/get-unloadingEndTps', getAllUnloadingEndTpsEntries);
router.get('/get-proforma', proforma06);

export default router;
