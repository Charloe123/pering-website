import mongoose from "mongoose";


const {Schema}= mongoose
const trendingSchema = new Schema({

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

 export default mongoose.models.trending || mongoose.model("trending", trendingSchema)

// const trending = mongoose.model("post",postSchema)

// export default post 
