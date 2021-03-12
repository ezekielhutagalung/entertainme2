const { Router } = require("express");
const MovieController = require("../controllers/MovieController");
const router = Router();

router.get("/", MovieController.getHandler);
router.post("/", MovieController.postHandler);
router.put("/:id", MovieController.putHandler);
router.delete("/:id", MovieController.destroyHandler);

module.exports = router;
