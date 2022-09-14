const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    video: {
        type: String,  //url
        required: true
    },
    topic:[{
        type:String,
        enum: ["pdf","video","quizes"],
        trim: true,
    }],
    duration:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    superAdminApproved:{
        type:Boolean,
    }
   
}, { timestamps: true })

module.exports = mongoose.model('admin', adminSchema)



