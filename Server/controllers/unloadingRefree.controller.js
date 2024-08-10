import UnloadingRef from "../models/unloadingRefree.model.js";
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

export const updateUnloadingRefEntry = async (req, res) => {
    try {
        const { chpEntryId, fines, tM, ADBm, ADBash, ADBvm, ADBgcv, EQ_M } = req.body;

        // Check if chpEntryId is valid
        const chpEntry = await chpEnt.findById(chpEntryId);
        if (!chpEntry) {
            return res.status(404).json({ message: "ChpEntry not found" });
        }

        // Find or create UnloadingRef entry
        let unloadingRefEntry = await UnloadingRef.findOne({ chpEntry: chpEntryId });

        if (!unloadingRefEntry) {
            const calculatedFields = calculateFields({ tM, ADBm, ADBash, ADBvm, ADBgcv, EQ_M });

            unloadingRefEntry = await UnloadingRef.create({
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
                message: "UnloadingRef entry created successfully",
                unloadingRefEntry,
            });
        }

        // Update existing entry
        unloadingRefEntry.fines = fines;
        unloadingRefEntry.tM = tM;
        unloadingRefEntry.ADBm = ADBm;
        unloadingRefEntry.ADBash = ADBash;
        unloadingRefEntry.ADBvm = ADBvm;
        unloadingRefEntry.ADBgcv = ADBgcv;
        unloadingRefEntry.EQ_M = EQ_M;

        const calculatedFields = calculateFields({ tM, ADBm, ADBash, ADBvm, ADBgcv, EQ_M });
        Object.assign(unloadingRefEntry, calculatedFields);

        await unloadingRefEntry.save();

        res.status(200).json({
            success: true,
            message: "UnloadingRef entry updated successfully",
            unloadingRefEntry,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

export const getAllUnloadingRefEntries = async (req, res) => {
    try {
        const unloadingRefEntries = await UnloadingRef.find().populate("chpEntry");
        res.json({
            success: true,
            message: "UnloadingRef entries fetched successfully",
            data: {
                entries: unloadingRefEntries,
            },
        });
    } catch (error) {
        console.error("Error fetching UnloadingRef entries:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
