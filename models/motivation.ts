import mongoose from "mongoose";


const {Schema}= mongoose
const motivationSchema = new Schema({

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

 export default mongoose.models.motivation || mongoose.model("motivation", motivationSchema)


