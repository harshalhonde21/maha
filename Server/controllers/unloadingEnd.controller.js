import UnloadingEndTps from "../models/unloadingEnd.model.js";
import chpEnt from "../models/chp.model.js";

// comments for understanding the further developer after me

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

export const updateUnloadingEndTpsEntry = async (req, res) => {
    try {
        const { chpEntryId, fines, tM, ADBm, ADBash, ADBvm, ADBgcv, EQ_M } =
            req.body;

        // Check if chpEntryId is valid
        const chpEntry = await chpEnt.findById(chpEntryId);
        if (!chpEntry) {
            return res.status(404).json({ message: "ChpEntry not found" });
        }

        // Find or create UnloadingEndTps entry
        let unloadingEndTpsEntry = await UnloadingEndTps.findOne({
            chpEntry: chpEntryId,
        });

        if (!unloadingEndTpsEntry) {
            const calculatedFields = calculateFields({
                tM,
                ADBm,
                ADBash,
                ADBvm,
                ADBgcv,
                EQ_M,
            });

            unloadingEndTpsEntry = await UnloadingEndTps.create({
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
                message: "UnloadingEndTps entry created successfully",
                unloadingEndTpsEntry,
            });
        }

        // Update existing entry
        unloadingEndTpsEntry.fines = fines;
        unloadingEndTpsEntry.tM = tM;
        unloadingEndTpsEntry.ADBm = ADBm;
        unloadingEndTpsEntry.ADBash = ADBash;
        unloadingEndTpsEntry.ADBvm = ADBvm;
        unloadingEndTpsEntry.ADBgcv = ADBgcv;
        unloadingEndTpsEntry.EQ_M = EQ_M;

        const calculatedFields = calculateFields({
            tM,
            ADBm,
            ADBash,
            ADBvm,
            ADBgcv,
            EQ_M,
        });
        Object.assign(unloadingEndTpsEntry, calculatedFields);

        await unloadingEndTpsEntry.save();

        res.status(200).json({
            success: true,
            message: "UnloadingEndTps entry updated successfully",
            unloadingEndTpsEntry,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

export const getAllUnloadingEndTpsEntries = async (req, res) => {
    try {
        const unloadingEndTpsEntries = await UnloadingEndTps.find().populate(
            "chpEntry"
        );
        res.json({
            success: true,
            message: "UnloadingEndTps entries fetched successfully",
            data: {
                entries: unloadingEndTpsEntries,
            },
        });
    } catch (error) {
        console.error("Error fetching UnloadingEndTps entries:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const proforma06 = async (req, res) => {
    try {
        const unloadingEndTpsEntries = await UnloadingEndTps.find().populate('chpEntry');

        const coalModeData = {};

        unloadingEndTpsEntries.forEach(entry => {
            const { coalMode, coalType, coalComponent, selectMine: sliding, rrWt, tpsWt } = entry.chpEntry;
            const { tM, EQ_M, EQASH, EQGCV, ARBGCV } = entry;

            if (!coalModeData[coalMode]) {
                coalModeData[coalMode] = {};
            }

            if (!coalModeData[coalMode][coalType]) {
                coalModeData[coalMode][coalType] = {};
            }

            if (!coalModeData[coalMode][coalType][coalComponent]) {
                coalModeData[coalMode][coalType][coalComponent] = [];
            }

            const slidingEntry = coalModeData[coalMode][coalType][coalComponent].find(item => item.sliding === sliding);
            if (slidingEntry) {
                slidingEntry.entryCount += 1;
                slidingEntry.totalRrWt += parseFloat(rrWt);
                slidingEntry.totalTpsWt += parseFloat(tpsWt);
                slidingEntry.tmSum += parseFloat(tpsWt) * parseFloat(tM);
                slidingEntry.eqMSum += parseFloat(EQ_M);
                slidingEntry.eqAshSum += parseFloat(EQASH);
                slidingEntry.eqGcvSum += parseFloat(EQGCV);
                slidingEntry.arbGcvSum += parseFloat(ARBGCV);
            } else {
                coalModeData[coalMode][coalType][coalComponent].push({
                    sliding,
                    entryCount: 1,
                    totalRrWt: parseFloat(rrWt),
                    totalTpsWt: parseFloat(tpsWt),
                    tmSum: parseFloat(tpsWt) * parseFloat(tM),
                    eqMSum: parseFloat(EQ_M),
                    eqAshSum: parseFloat(EQASH),
                    eqGcvSum: parseFloat(EQGCV),
                    arbGcvSum: parseFloat(ARBGCV)
                });
            }
        });

        const proforma06Data = Object.keys(coalModeData).map(coalMode => ({
            coalMode,
            coalTypes: Object.keys(coalModeData[coalMode]).map(coalType => ({
                coalType,
                components: Object.keys(coalModeData[coalMode][coalType]).map(coalComponent => ({
                    coalComponent,
                    coalMode,
                    entries: coalModeData[coalMode][coalType][coalComponent].map(entry => ({
                        ...entry,
                        tmPercentage: (entry.tmSum / entry.totalTpsWt).toFixed(2),
                        mPercentage: (entry.eqMSum / entry.entryCount).toFixed(2),
                        ashPercentage: (entry.eqAshSum / entry.entryCount).toFixed(2),
                        gcvKcalKg: (entry.eqGcvSum / entry.entryCount).toFixed(2),
                        arbGcvKcalKg: (entry.arbGcvSum / entry.entryCount).toFixed(2)
                    }))
                }))
            }))
        }));

        res.json({
            success: true,
            message: "Proforma06 data generated successfully",
            data: proforma06Data
        });
    } catch (error) {
        console.error("Error generating Proforma06 data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
