const entertaintmeRoutes = require("../routes/entertainmeRoutes");
const moviesRoutes = require("../routes/movieRoute");
const tvSeriesRoutes = require("../routes/tvSeriesRoute");
const { Router } = require("express");
const router = Router();

router.use("/entertainme", entertaintmeRoutes);
router.use("/movies", moviesRoutes);
router.use("/tvseries", tvSeriesRoutes);

module.exports = router;
