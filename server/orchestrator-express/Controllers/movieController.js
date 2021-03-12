const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class MovieController {
  static async getHandler(req, res) {
    try {
      const moviesData = await redis.get("movies:data");
      if (moviesData) {
        // console.log("masuk di chaching");
        res.status(200).json(JSON.parse(moviesData));
      } else {
        // console.log("masuk di server");
        const movies = await axios({
          url: "http://localhost:4001/movies",
          method: "GET",
        });
        await redis.set("movies:data", JSON.stringify(movies.data));
        res.status(200).json(movies.data);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async postHandler(req, res) {
    try {
      await redis.del("movies:data");
      await redis.del("entertainMe:data");
      const { title, overview, poster_path, popularity, tags } = req.body;
      const obj = {
        title,
        overview,
        poster_path,
        popularity: parseFloat(popularity),
        tags: tags,
      };
      const newMovie = await axios({
        url: "http://localhost:4001/movies",
        method: "POST",
        data: obj,
      });
      res.status(201).json(newMovie.data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async putHandler(req, res) {
    try {
      await redis.del("movies:data");
      await redis.del("entertainMe:data");
      const id = req.params.id;
      const { title, overview, poster_path, popularity, tags } = req.body;
      const obj = {
        title,
        overview,
        poster_path,
        popularity: parseFloat(popularity),
        tags: tags,
      };
      const updatedData = await axios({
        url: `http://localhost:4001/movies/${id}`,
        method: "PUT",
        data: obj,
      });
      res.status(200).json(updatedData.data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async destroyHandler(req, res) {
    try {
      const id = req.params.id;
      await redis.del("movies:data");
      const deleted = await axios({
        url: `http://localhost:4001/movies/${id}`,
        method: "DELETE",
      });
      res.status(200).json(deleted.data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = MovieController;
