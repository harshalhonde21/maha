import express from 'express';
import { updateUnloadingThirdTpsEntry, getAllUnloadingThirdTpsEntries } from '../controllers/unloadingThird.controller.js';

const router = express.Router();

router.put('/unloadingThirdAddUpdate', updateUnloadingThirdTpsEntry);
router.get('/get-unloadingThirdTps', getAllUnloadingThirdTpsEntries);

export default router;
