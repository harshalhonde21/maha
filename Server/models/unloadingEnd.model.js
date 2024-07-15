import mongoose from "mongoose";

const unloadingEndTpsSchema = new mongoose.Schema({
    chpEntry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChpEntry',
        required: true
    },
    fines: {
        type: String,
    },
    tM: {
        type: String,
    },
    ADBm: {
        type: String,
    },
    ADBash: {
        type: String,
    },
    ADBvm: {
        type: String,
    },
    ADBgcv: {
        type: String,
    },
    EQ_M: {
        type: String,
    },
    ADBFC:{
        type: String,
    },
    ADBCALGcv:{
        type: String,
    },
    ARBASH:{
        type: String,
    },
    ARBVM:{
        type: String,
    },
    ARBFC:{
        type: String,
    },
    ARBCALGcv:{
        type: String,
    },
    ARBGCV:{
        type: String,
    },
    EQASH:{
        type: String,
    },
    EQVM:{
        type: String,
    },
    EQFC:{
        type: String,
    },
    EQGCV:{
        type: String,
    },
    SM:{
        type: String,
    },


    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UnloadingEndTps = mongoose.model("UnloadingEndTps", unloadingEndTpsSchema);

export default UnloadingEndTps;
