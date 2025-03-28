const express = require("express");
const { authController } = require("../controllers");
 const {authenticator} = require('../middleware')
const router = express.Router();

router.get("/", authController.get);

router.post('/', authController.create)

router.put('/',authenticator.verifyToken,authController.update)

router.post('/admin',authController.adminLogin)

module.exports = router;
