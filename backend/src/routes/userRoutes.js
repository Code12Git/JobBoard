const express = require("express");
const { userController } = require("../controllers");
const {authenticator} = require('../middleware')
const router = express.Router();



router.get('/',authenticator.verifyTokenAndAdmin,userController.getAll)


module.exports = router;
