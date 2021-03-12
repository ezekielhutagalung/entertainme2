const router = require("express").Router();
const EntertainMeController = require("../controllers/entertaintMeController");

router.get("/", EntertainMeController.getAll);

module.exports = router;
