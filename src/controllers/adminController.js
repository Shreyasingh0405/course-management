const adminModel = require("../models/adminModel");
const { isDescription, isTitle, isFile, trimAndUpperCase, isDuration, isCategory } = require("../validators/validator")
const { uploadFile } = require("../aws/awsconfig")
const mongoose = require("mongoose")




const createCourse = async function (req, res) {       // >> create course by Admin
    try {
        let Data = req.body
        const files = req.files;
        let { title, description, video, topic, duration, category } = Data
        if (!Object.keys(Data).length) {
            return res.status(400).send({ status: false, message: "Bad request, please enter details in the Request Body.", });
        }

        const error = {};
        if (isTitle(title) !== true) error.nameError = isTitle(title);
        if (isDescription(description) !== true) error.descriptionError = isDescription(description);
        if (isFile(files) !== true) error.videoError = isFile(files);
        if (isDuration(duration) !== true) error.durationError = isDuration(duration);
        if (isCategory(category) !== true) error.categoryError = isCategory(category);

        if (!topic) return res.status(400).send({ status: false, message: "please enter a topic" })
        const arr = ["pdf", "video", "quizes"]
        if (topic && (!arr.includes(topic))) return res.status(400).send({ status: false, message: `You Can Uplode One Topic at once in between ${arr}` })

        if (Object.keys(error).length > 0) return res.status(400).send({ status: false, message: { error } })
        title = trimAndUpperCase(title);

        const videoUrl = await uploadFile(files[0]);
        Data.video = videoUrl
        Data.superAdminApproved=true
        const userData = await adminModel.create(Data);
        return res.status(201).send({ status: true, message: "Course created successfully and Approved By SuperAdmin", data: userData });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}
//-------------------------------------------
const updateCourse = async function (req, res) {
    try {
        let data = req.body
        let adminId = req.params.adminId
        const arrFiles = req.files;
        let{topic,video}=data
        if (Object.keys(data).length == 0 && !arrFiles)
            return res.status(404).send({ msg: "No data for Update ⚠️" })
        if((Object.keys(data).includes("arrFiles") && req.files.length==0 ))
        return res.status(404).send({ msg: "No data for Update ⚠️" })
        if (!mongoose.isValidObjectId(adminId))
            return res.status(400).send({ Status: false, message: "Please enter valid adminId ⚠️" })

        let findCourse = await adminModel.findById(adminId)
        if (!findCourse)
            return res.status(404).send({ msg: "adminId  is invalid ⚠️" })

        if (findCourse.isDeleted == true)
            return res.status(404).send({ msg: "This Course is already deleted ⚠️" })

        const arr = ["pdf", "video", "quizes"]
        if (topic && (!arr.includes(topic))) return res.status(400).send({ status: false, message: `You Can Uplode One Topic at once in between ${arr}` })
        
        var videoUrl;
        if (arrFiles && arrFiles.length !== 0) {
            if (isFile(arrFiles) !== true) return res.status(400).send({ status: false, message: "⚠️ invalid format of the profile image" });
             videoUrl = await uploadFile(arrFiles[0]);
        }
        if (findCourse.isDeleted == false) {
            let updatedCourse = await adminModel.findOneAndUpdate({ _id: adminId }, {
                $set: {
                    video:videoUrl,
                    topic:topic,
                    superAdminApproved:true,
                },
            }, { new: true, upsert: true })
            return res.status(200).send({ status: true, msg: "Updated Sucessfully and Approved By SuperAdmin",data:updatedCourse })
        }

    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

//---------------------------------------
const deleteCourse = async (req, res) => {
    try {
        let adminId = req.params.adminId;
        if (!Object.keys(adminId)) {
            return res.status(400).send({ status: false, message: "Invalid adminId. ⚠☣" })
        }
        let data = await adminModel.findOne({ _id: adminId, isDeleted: false });
        if (!data) {
            return res.status(400).send({ status: false, message: "This Course Data is already deleted Or Doesn't Exist" });
        }
        await adminModel.findOneAndUpdate({ _id: adminId }, { isDeleted: true, deletedAt: Date() }, { new: true });
        return res.status(200).send({ status: true, message: "Deleted Sucessfully. ♻✔" });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message });
    }
};


module.exports = { createCourse, deleteCourse, updateCourse }