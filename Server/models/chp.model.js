import mongoose from "mongoose";

const chpEntrySchema = new mongoose.Schema({
    coalMode:{
        type: String,
        required: [true, "Please enter Coal Model"],
    },
    coalType:{
        type: String,
        required: [true, "Please enter Coal Type"],
    },
    coalComponent:{
        type:String,
        required : [ true, "Please enter Coal Component"],
    },
    selectDeclared:{
        type:String,
    },
    selectWasheryOperator:{
        type:String,
    },
    selectMine:{
        type:String,
    },
    rrNo:{
        type:String,
        required:[true, 'RR Number must required'],
    },
    rrDate:{
        type:String,
        required:[true, 'RR Date must required'],
    },
    receiptDate:{
        type:String,
        required:[true, 'Receipt Date must required'],
    },
    noBox:{
        type:String,
        required:[true, 'No of Boxes must required'],
    },
    rakeNo:{
        type:String,
        required:[true, 'Rake Number must required'],
    },
    rrWt:{
        type:String,
        required:[true, 'RR WT must required'],
    },
    tpsWt:{
        type:String,
        required:[true, 'Tps Wt must required'],
    },
    wtAvg:{
        type:String,
        required:[true, 'Wt Avg must required'],
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const chpEnt = mongoose.model("ChpEntry", chpEntrySchema);

export default chpEnt;
