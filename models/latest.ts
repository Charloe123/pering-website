import mongoose from "mongoose";


const {Schema}= mongoose
const latestSchema = new Schema({

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

    imageUrl:{
        type:String,
        required:true,
    }
})

 export default mongoose.models.latest || mongoose.model("latest", latestSchema)




