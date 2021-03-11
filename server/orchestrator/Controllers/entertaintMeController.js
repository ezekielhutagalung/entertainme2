const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class EntertaintMeController {
  static async getAll(req, res) {
    try {
      const entertaintMeData = await redis.get("entertaintMe:data");
      if (entertaintMeData) {
        res.status(200).json(JSON.parse(entertaintMeData));
      } else {
        const movies = await axios({
          url: "http://localhost:3000/movies",
          method: "GET",
        });
        const series = await axios({
          url: "http://localhost:3000/tvseries",
          method: "GET",
        });

        const entertaintMe = {
          movies: movies.data,
          tvseries: series.data,
        };

        redis.set("entertainMe:data", JSON.stringify(entertaintMe));
        res.status(200).json(entertaintMe);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = EntertaintMeController;
