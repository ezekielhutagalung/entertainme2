const router = require("express").Router();
const moviesRouter = require("./movieRoutes.js");
const tvSeriesRouter = require("./tvSeriesRoute");

router.use("/movies", moviesRouter);
router.use("/tvseries", tvSeriesRouter);

module.exports = router;
