import chpEnt from "../models/chp.model.js";

export const registerChpEntry = async (req, res) => {
    try {
        const {
            coalMode,
            coalType,
            coalComponent,
            selectDeclared,
            selectWasheryOperator,
            selectMine,
            rrNo,
            rrDate,
            receiptDate,
            noBox,
            rakeNo,
            rrWt,
            tpsWt,
            wtAvg,
        } = req.body;

        if (
            [
                coalMode,
                coalType,
                coalComponent,
                rrNo,
                rrDate,
                receiptDate,
                noBox,
                rakeNo,
                rrWt,
                tpsWt,
                wtAvg,
            ].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json({ message: "All Fields are required" });
        }


        const chpEntry = await chpEnt.create({
            coalMode,
            coalType,
            coalComponent,
            selectDeclared,
            selectWasheryOperator,
            selectMine,
            rrNo,
            rrDate,
            receiptDate,
            noBox,
            rakeNo,
            rrWt,
            tpsWt,
            wtAvg,
        });

        res.status(201).json({
            success: true,
            message: "ChpEntry created successfully",
            chpEntry,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};


export const updateChpEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            coalType,
            coalComponent,
            selectDeclared,
            selectWasheryOperator,
            selectMine,
            rrNo,
            rrDate,
            receiptDate,
            noBox,
            rakeNo,
            rrWt,
            tpsWt,
            wtAvg,
        } = req.body;

        // Check if any required field is missing
        if (
            [
                coalType,
                coalComponent,
                rrNo,
                rrDate,
                receiptDate,
                noBox,
                rakeNo,
                rrWt,
                tpsWt,
                wtAvg,
            ].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json({ message: "All Fields are required" });
        }

        // Find the ChpEntry document by ID and update it
        const chpEntry = await chpEnt.findByIdAndUpdate(
            id,
            {
                coalType,
                coalComponent,
                selectDeclared,
                selectWasheryOperator,
                selectMine,
                rrNo,
                rrDate,
                receiptDate,
                noBox,
                rakeNo,
                rrWt,
                tpsWt,
                wtAvg,
            },
            { new: true, runValidators: true }
        );

        if (!chpEntry) {
            return res.status(404).json({ message: "ChpEntry not found" });
        }

        res.status(200).json({
            success: true,
            message: "ChpEntry updated successfully",
            chpEntry,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};


export const getAllChpEntries = async (req, res) => {
    try {
        const chpEntries = await chpEnt.find();

        const categorizedEntries = {
            "Raw Coal": [],
            "Washed Coal": [],
            "Imported Coal": [],
            "Other": []
        };

        chpEntries.forEach(entry => {
            if (categorizedEntries.hasOwnProperty(entry.coalType)) {
                categorizedEntries[entry.coalType].push(entry);
            } else {
                categorizedEntries["Other"].push(entry);
            }
        });

        res.json(categorizedEntries);
    } catch (error) {
        console.error("Error fetching Chp entries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAllChpEntriesPlain = async (req, res) => {
    try {
        const chpEntries = await chpEnt.find();
        res.json(chpEntries);
    } catch (error) {
        console.error("Error fetching Chp entries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

