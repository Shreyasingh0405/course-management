const express = require('express');
const router = express.Router();
const{createEmp,empLogin, getCourseById,getCourseByquery}=require("../controllers/empController")
const{createCourse,deleteCourse,updateCourse}=require("../controllers/adminController")
const{authentication}=require("../middleware/auth")

router.post("/register", createEmp)
router.post("/login", empLogin)

router.post("/courseRegister",createCourse)
router.delete("/course/:courseId",deleteCourse)
router.put("/course/:adminId",updateCourse)

router.get("/course/:employeeId",authentication,getCourseById)  //auth
router.get("/coursebycategory/:empId",authentication,getCourseByquery)  //auth

module.exports=router;
