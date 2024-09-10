const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require('../models/empModel.js');

module.exports.authentication= async function (req, res, next) {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ status: false, message: "Missing authentication token in request ⚠️", });
    }
    token = token.substring(7);
    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(401).send({ status: false, message: "Invalid authentication token in request headers." })
    }
    if (Date.now() > (decoded.exp) * 1000) {
      return res.status(440).send({ status: false, message: "Session expired! Please login again." })//​​440 Login Timeout
    }
    jwt.verify(token, "SchbangQ", function (err, decoded) {
      if (err) {
        return res.status(400).send({ status: false, message: "token invalid ⚠️" });
      }
      else {
        req.userId = decoded.userId;
        req.token = decoded
        return next();
      }
    });

  }
  catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};


    
