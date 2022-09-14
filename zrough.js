// if (!isValid(name))
// return res.status(400).send({ status: false, message: "Please enter valid name. ⚠️" });

// if (!isName(name))
// return res.status(400).send({ status: false, message: "Please enter valid name. ⚠️" });

// // if (!nameRegex.test(name)) {
// //     return res.status(400).send({ status: false, message: "You entered an invalid Name" });}


// // Email------------------------
// if (!isValid(email))
// return res.status(400).send({ status: false, message: "Please enter valid emailId. ⚠️" });

// if (isEmail(email))
// return res.status(400).send({ status: false, message: "Please enter valid emailId. ⚠️" });


// let checkEmail = emailValidator.validate(email);
// if (checkEmail == false) {
// return res.status(400).send({ status: false, message: "You entered an invalid EmailId" });}

// let findEmail = await empModel.findOne({ email: email });
// if (findEmail) {
// return res.status(400).send({ status: false, message: "This EmailId already exists" });}


// if (!isValid(password))
// return res.status(400).send({ status: false, message: "Please enter valid Password. ⚠️" });


// if (!isValid(password))
// return res.status(400).send({ status: false, message: "Please enter valid Password. ⚠️" });



// if (!isValid(role))
// return res.status(400).send({ status: false, message: "Please enter valid Role. ⚠️" });

//

//array of string
//category duration and topic validation

//description-pdf
// function isDescription(x){
//     if(x === undefined || x === null || x.length===0) return "mandatory File is missing"; //rectified after test
//     const name = x[0].originalname;
//     const regEx = /\.(WEBM|MP2|MPG|MPEG|MPE|MPV|OGG|MP4|M4P|M4V|AVI|WMV|FLV|SWF|AVCHD|QT|mp4)$/;    //Source for video format https://blog.filestack.com/thoughts-and-knowledge/complete-list-audio-video-file-formats/
//     const checkDes = name.match(regEx);
//     if(checkDes === null) return "Description secto";
//     return true;
// }