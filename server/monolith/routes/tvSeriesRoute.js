const router = require("express").Router();
const tvSeriesController = require("../controllers/tvseriesController");

router.get("/", tvSeriesController.getTvSeries);
router.post("/", tvSeriesController.postTvSeries);
router.put("/:id", tvSeriesController.putTvSeries);
router.delete("/:id", tvSeriesController.deleteTvSeries);

module.exports = router;
