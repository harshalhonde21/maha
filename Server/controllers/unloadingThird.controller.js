import UnloadingThird from "../models/unloadingThird.model.js";
import chpEnt from "../models/chp.model.js";

const calculateFields = (data) => {
    const { tM, ADBm, ADBash, ADBvm, ADBgcv, EQ_M } = data;

    const ADBFC = (100 - ADBm - ADBash - ADBvm).toFixed(2);
    const ADBCALGcv = (8555.56 - (94.11 * ADBash + 145.56 * ADBm)).toFixed(2);
    const ARBASH = (((100 - tM) / (100 - ADBm)) * ADBash).toFixed(2);
    const ARBVM = (((100 - tM) / (100 - ADBm)) * ADBvm).toFixed(2);
    const ARBFC = (((100 - tM) / (100 - ADBm)) * ADBFC).toFixed(2);
    const ARBCALGcv = (((100 - tM) / (100 - ADBm)) * ADBgcv).toFixed(2);
    const ARBGCV = (((100 - tM) / (100 - ADBm)) * ADBgcv).toFixed(2);
    const EQASH = (((100 - EQ_M) / (100 - ADBm)) * ADBash).toFixed(2);
    const EQVM = (((100 - EQ_M) / (100 - ADBm)) * ADBvm).toFixed(2);
    const EQFC = (((100 - EQ_M) / (100 - ADBm)) * ADBFC).toFixed(2);
    const EQGCV = (((100 - EQ_M) / (100 - ADBm)) * ADBgcv).toFixed(2);
    const SM = (tM - EQ_M).toFixed(2);

    return {
        ADBFC,
        ADBCALGcv,
        ARBASH,
        ARBVM,
        ARBFC,
        ARBCALGcv,
        ARBGCV,
        EQASH,
        EQVM,
        EQFC,
        EQGCV,
        SM,
    };
};

export const updateUnloadingThirdTpsEntry = async (req, res) => {
    try {
        const { chpEntryId, fines, tM, ADBm, ADBash, ADBvm, ADBgcv, EQ_M } = req.body;

        // Check if chpEntryId is valid
        const chpEntry = await chpEnt.findById(chpEntryId);
        if (!chpEntry) {
            return res.status(404).json({ message: "ChpEntry not found" });
        }

        // Find or create UnloadingThird entry
        let unloadingThirdEntry = await UnloadingThird.findOne({
            chpEntry: chpEntryId,
        });

        if (!unloadingThirdEntry) {
            const calculatedFields = calculateFields({
                tM,
                ADBm,
                ADBash,
                ADBvm,
                ADBgcv,
                EQ_M,
            });

            unloadingThirdEntry = await UnloadingThird.create({
                chpEntry: chpEntryId,
                fines,
                tM,
                ADBm,
                ADBash,
                ADBvm,
                ADBgcv,
                EQ_M,
                ...calculatedFields,
            });

            return res.status(201).json({
                success: true,
                message: "UnloadingThird entry created successfully",
                unloadingThirdEntry,
            });
        }

        // Update existing entry
        unloadingThirdEntry.fines = fines;
        unloadingThirdEntry.tM = tM;
        unloadingThirdEntry.ADBm = ADBm;
        unloadingThirdEntry.ADBash = ADBash;
        unloadingThirdEntry.ADBvm = ADBvm;
        unloadingThirdEntry.ADBgcv = ADBgcv;
        unloadingThirdEntry.EQ_M = EQ_M;

        const calculatedFields = calculateFields({
            tM,
            ADBm,
            ADBash,
            ADBvm,
            ADBgcv,
            EQ_M,
        });
        Object.assign(unloadingThirdEntry, calculatedFields);

        await unloadingThirdEntry.save();

        res.status(200).json({
            success: true,
            message: "UnloadingThird entry updated successfully",
            unloadingThirdEntry,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

export const getAllUnloadingThirdTpsEntries = async (req, res) => {
    try {
        const unloadingThirdEntries = await UnloadingThird.find().populate("chpEntry");
        res.json({
            success: true,
            message: "UnloadingThird entries fetched successfully",
            data: {
                entries: unloadingThirdEntries,
            },
        });
    } catch (error) {
        console.error("Error fetching UnloadingThird entries:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};