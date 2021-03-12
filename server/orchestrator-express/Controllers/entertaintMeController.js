const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class EntertainMeController {
  static async getAll(req, res) {
    try {
      const entertainMeData = await redis.get("entertainMe:data");
      if (entertainMeData) {
        res.status(200).json(JSON.parse(entertainMeData));
      } else {
        const movies = await axios({
          url: "http://localhost:4001/movies",
          method: "GET",
        });
        const series = await axios({
          url: "http://localhost:4002/tvseries",
          method: "GET",
        });

        const entertainMe = {
          movies: movies.data,
          tvseries: series.data,
        };

        redis.set("entertainMe:data", JSON.stringify(entertainMe));
        res.status(200).json(entertainMe);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = EntertainMeController;
