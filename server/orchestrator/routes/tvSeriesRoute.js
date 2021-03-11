const { Router } = require("express");
const tvSeriesController = require("../Controllers/tvSeriesController");
const router = Router();

router.get("/", tvSeriesController.getHandler);
router.post("/", tvSeriesController.postHandler);
router.put("/:id", tvSeriesController.putHandler);
router.delete("/:id", tvSeriesController.destroyHandler);

module.exports = router;
