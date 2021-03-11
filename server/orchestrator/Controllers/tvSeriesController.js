const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class tvSeriesController {
  static async getHandler(req, res) {
    try {
      const seriesData = await redis.get("tvseries:data");
      if (seriesData) {
        res.status(200).json(JSON.parse(seriesData));
      } else {
        const series = await axios({
          url: "http://localhost:3000/tvseries",
          method: "GET",
        });
        await redis.set("tvseries:data", JSON.stringify(series.data));
        res.status(200).json(series.data);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async postHandler(req, res) {
    try {
      await redis.del("tvseries:data");
      await redis.del("entertaintMe:data");

      const { title, overview, poster_path, popularity, tags } = req.body;
      const obj = {
        title,
        overview,
        poster_path,
        popularity: parseFloat(popularity),
        tags: tags,
      };

      const newSeries = await axios({
        url: "http://localhost:3000/tvseries",
        method: "POST",
        data: obj,
      });
      res.status(201).json(newSeries.data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async putHandler(req, res) {
    try {
      await redis.del("tvseries:data");
      await redis.del("entertaintMe:data");
      const id = req.params.id;
      const { title, overview, poster_path, popularity, tags } = req.body;
      const obj = {
        title,
        overview,
        poster_path,
        popularity: parseFloat(popularity),
        tags: tags,
      };

      const updatedSeries = await axios({
        url: `http://localhost:3000/tvseries/${id}`,
        method: "PUT",
        data: obj,
      });
      res.status(201).json(updatedSeries.data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async destroyHandler(req, res) {
    try {
      await redis.del("tvseries:data");
      await redis.del("entertainMe:data");
      const id = req.params.id;
      const deleted = await axios({
        url: `http://localhost:3000/tvseries/${id}`,
        method: "DELETE",
      });
      res.status(200).json(deleted.data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = tvSeriesController;
