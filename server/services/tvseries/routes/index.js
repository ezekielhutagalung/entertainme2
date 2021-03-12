const router = require("express").Router();
const tvSeriesRouter = require("./tvSeriesRouter");

router.use("/tvseries", tvSeriesRouter);

module.exports = router;
