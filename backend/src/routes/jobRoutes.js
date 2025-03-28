const express = require("express");
const { jobController } = require("../controllers");
const {authenticator} = require("../middleware");
const {verifyData} = require("../middleware");
const {jobSchema} = require("../validation");

const router = express.Router();

router.post(
  "/",
  authenticator.verifyTokenAndEmployer,
  verifyData(jobSchema),
  jobController.create
);

router.put(
  "/:id",
  authenticator.verifyTokenAndEmployer,
  verifyData(jobSchema),
  jobController.update
);

router.delete("/:id", authenticator.verifyTokenAndAdmin, jobController.deleteOne);

router.get("/:id", authenticator.verifyToken, jobController.get);

router.get("/", authenticator.verifyToken, jobController.getAll);

module.exports = router;
