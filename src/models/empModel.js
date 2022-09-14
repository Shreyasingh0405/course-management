const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    CourseId: {
        type: ObjectId,
        // required: true,
        ref: "admin"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:"Employee"
    }
   
}, { timestamps: true })

module.exports = mongoose.model('emp', empSchema)
