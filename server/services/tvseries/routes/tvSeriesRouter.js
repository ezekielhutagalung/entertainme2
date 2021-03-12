const router = require("express").Router();
const tvSeriesController = require("../controllers/tvSeriesController");

router.get("/", tvSeriesController.getTvSeries);
router.post("/", tvSeriesController.postTvSeries);
router.get("/:id", tvSeriesController.findTvSeries);
router.put("/:id", tvSeriesController.putTvSeries);
router.delete("/:id", tvSeriesController.deleteTvSeries);

module.exports = router;
