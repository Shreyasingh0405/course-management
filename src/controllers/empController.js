const empModel = require("../models/empModel");
const adminModel=require("../models/adminModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose=require("mongoose")
const { isName, isEmail, isPassword, trimAndUpperCase, removeSpaces,isValid} = require("../validators/validator")


const createEmp = async function (req, res) {
    try {
        let Data = req.body
        let { name, email, password, role } = Data
        if (!Object.keys(Data).length) {
            return res.status(400).send({ status: false, message: "Bad request, please enter details in the Request Body.", });
        }

        const error = {};
        if (isName(name) !== true) error.nameError = isName(name);
        if (isEmail(email) !== true) error.emailError = isEmail(email);
        if (isPassword(password) !== true) error.passwordError = isPassword(password);
        if(role==""){role="Employee"}

        if (Object.keys(error).length > 0) return res.status(400).send({ status: false, message: { error } })
        name = trimAndUpperCase(name);
        email = removeSpaces(email);

        const hash = bcrypt.hashSync(password, 10); // para1:password, para2:saltRound

        let checkEmail = await empModel.findOne({ email: email });         //======DB call For Uniqueness===//
        if (checkEmail) return res.status(400).send({ status: false, message: " ⚠️ This Email is already used." });

        let employeeregister = { name, email, password: hash, role }
        const userData = await empModel.create(employeeregister);
        return res.status(201).send({ status: true, message: "User created successfully", data: userData });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}

//--------------------------Log In---------------------------------//

const empLogin = async (req, res) => {
    try {                                                                    // >> Validator
        const body = req.body
        const { email, password } = body
        if (!Object.keys(body)) {
            return res.status(400).send({ status: false, message: "Please provide The Credential To Login. ❗" });
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please provide The Email-id. 🛑❌" });
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please provide The password. 🛑❌" });;
        }
        let user = await empModel.findOne({ email: email });
        if (user) {
            const Passwordmatch = bcrypt.compareSync(body.password, user.password);
            if (Passwordmatch) {
                const generatedToken = jwt.sign({
                    employeeId: user._id,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 15
                }, 'SchbangQ')
                res.setHeader('Authorization', 'Bearer ' + generatedToken)
                return res.status(200).send({
                    "status": true,
                    message: "User login successfull",                      //" user loggedIn Succesfully ✔🟢"
                    data: {
                        Id: user._id,
                        token: generatedToken,
                    }
                });
            } else {
                res.status(401).send({ status: false, message: "Password Is Inappropriate. ❗" });
            }
        } else {
            return res.status(400).send({ status: false, message: "Invalid credentials. ❗" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message });
    }
};

//========================

const getCourseById = async (req, res) => {
    try {
        let employeeId = req.params.employeeId

        if (!employeeId) return res.status(400).send({ status: false, mesage: "employeeId required" })

        if (!mongoose.isValidObjectId(employeeId)) {
            return res.status(400).send({ status: false, mesage: "invalid employeeId" })
        }

        const EmployeeExist = await empModel.findById(employeeId)
        if (!EmployeeExist) return res.status(404).send({ status: false, message: "Employee doesn't exist" })

        const findCourse = await adminModel.find({ superAdminApproved:true,isDeleted:false }).sort({category:-1})               //true check
        if (!findCourse) return res.status(404).send({ status: false, message: "No Course found" })

        return res.status(200).send({ status: true, message: "Sucess", data: findCourse });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error.message });

    }
}


const getCourseByquery= async (req, res) => {
    try {
        let employeeId = req.params.empId
        let categoryQuery=req.query.category

            if (!employeeId) return res.status(400).send({ status: false, mesage: "employeeId required" })

        if (!mongoose.isValidObjectId(employeeId)) {
            return res.status(400).send({ status: false, mesage: "invalid employeeId" })
        }
        if (!categoryQuery) return res.status(400).send({ status: false, mesage: "Category is not Specified" })

        const EmployeeExist = await empModel.findById(employeeId)
        if (!EmployeeExist) return res.status(404).send({ status: false, message: "Employee doesn't exist" })

        const findCourse = await adminModel.find({ category:categoryQuery,superAdminApproved:true,isDeleted:false }).sort({category:-1})               //
        if (!findCourse) return res.status(404).send({ status: false, message: "No Course found" })

        return res.status(200).send({ status: true, message: "Sucess", data: findCourse });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error.message });

    }
}

module.exports={createEmp,empLogin,getCourseById,getCourseByquery}