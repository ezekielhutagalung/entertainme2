const router = require("express").Router();
const MovieController = require("../controllers/movieController");

router.get("/", MovieController.getMovie);
router.post("/", MovieController.postMovie);
router.put("/:id", MovieController.putMovie);
router.delete("/:id", MovieController.deleteMovie);

module.exports = router;
