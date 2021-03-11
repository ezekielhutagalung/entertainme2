const router = require("express").Router();
const EntertaintMeController = require("../controllers/entertaintMeController");

router.get("/", EntertaintMeController.getAll);

module.exports = router;
