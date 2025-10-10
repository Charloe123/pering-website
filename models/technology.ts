import mongoose from "mongoose";


const {Schema}= mongoose
const technologySchema = new Schema({

    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },

    date:{
        type:Date,
        default:Date.now,
    },

    ImageUrl:{
        type:String,
        required:true,
    }
})

 export default mongoose.models.technology || mongoose.model("technology", technologySchema)