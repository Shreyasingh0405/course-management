const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

//passwword
function isPassword(x) {
    if (!x) return "mandatory password is missing";
    if (typeof x !== "string") return "Data type Error : password must be a string type";
    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,15}$/;
    if (!regEx.test(x)) return "invalid password format : It must contains atleast one lowercase, uppercase, digit & special characters among [!@#$%^&*]";
    return true;
}
//category
function isCategory(x) {
    if (!x) return "mandatory Category field is missing";
    if (typeof x !== "string") return "Data type Error : Category must be contain a stringType";
    return true;
}
//email
function isEmail(x) {
    if (!x) return "mandatory email is missing";
    if (typeof x !== "string") return "Data type Error : email must be a string type";
    const regEx = /^\s*[a-zA-Z0-9]+([\.\-\_\+][a-zA-Z0-9]+)*@[a-zA-Z]+([\.\-\_][a-zA-Z]+)*(\.[a-zA-Z]{2,3})+\s*$/;
    if (!regEx.test(x)) return "invalid email format";
    x = x.split("@");
    if (x[0].length > 64) return "email exceeded the maximum characters in local part";
    if (x[1].length > 255) return "email exceeded the maximum characters in domain part";
    return true;
}


function isName(x) {
    if (!x) return "mandatory name is missing";
    if (typeof x !== "string") return "Data type Error : name must be a string type";
    if (x.length > 64) return "name exceeded maximum charaters limit which is 64";
    const regEx = /^\s*[a-zA-Z](\.[\sa-zA-Z0-9]+)*[\sa-zA-Z0-9]*\s*$/;
    if (!regEx.test(x)) return "invalid format of name"
    return true;
}
function isTitle(x){
    if(!x) return "mandatory title is missing";
    if(typeof x !== "string") return "title should be written in string only";
    const regEx = /^\s*[a-zA-Z0-9]+([\.\-\_]?[a-zA-Z0-9\s]+)*$/;
    if(!regEx.test(x)) return "title is not in meaningful format";
    return true;
}


//description
function isDescription(x){
    if(!x) return "mandatory Description is missing";
    if(typeof x !== "string") return "Description should be written in string only";
    if(x.trim().length === 0) return "Description is not in meaningful format";
    return true;
}
//video:
function isFile(x){
    if(x === undefined || x === null || x.length===0) return "mandatory File is missing"; //rectified after test
    const name = x[0].originalname;
    const regEx = /\.(WEBM|MP2|MPG|MPEG|MPE|MPV|OGG|MP4|M4P|M4V|AVI|WMV|FLV|SWF|AVCHD|QT|mp4)$/;    //Source for video format https://blog.filestack.com/thoughts-and-knowledge/complete-list-audio-video-file-formats/
    const checkvideo = name.match(regEx);
    if(checkvideo === null) return "provided file is not in a proper videofile";
    return true;
}
//duration
function isDuration(time) {
    //Assuming you are working in 12 hour time, 0 is not a valid
    var patt = new RegExp("^(0?[1-9]|1[012]):[0-5][0-9]$");
    var res = patt.test(time);
    if(res===null) return "Duration must be a time format (HH:MM:SS)"
    return true;
}

// function isValidFile(x){
//     if(!x) return "mandatory videoFiles is missing";
//     const regEx = /\.(WEBM|MP2|MPG|MPEG|MPE|MPV|OGG|MP4|M4P|M4V|AVI|WMV|FLV|SWF|AVCHD|QT|mp4)$/;
//     if(!regEx.test(x)) return `provide video files must be in ${regEx} format`;
//     return true;
// }

//romoveSpaces
function removeSpaces(x){
    return x.split(" ").filter((y)=> y).join(" ");
}

//trimAndUpperCase
function trimAndUpperCase(x){
    return x.split(" ").filter((y)=> y).map((z)=> z = z.charAt(0).toUpperCase() + z.slice(1)).join(" ");
}


module.exports = { isName, isEmail, isPassword, removeSpaces,trimAndUpperCase,isTitle,isDescription,isFile,isCategory,isDuration,isValid}
