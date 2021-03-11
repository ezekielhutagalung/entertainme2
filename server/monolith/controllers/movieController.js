const movieModel = require("../models/movieModel");

class movieContorller {
  static async getMovie(req, res) {
    try {
      const movies = await movieModel.find();
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async postMovie(req, res) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;

      const obj = {
        title,
        overview,
        poster_path,
        popularity: parseFloat(popularity),
        tags,
      };

      console.log(obj, "ini obj");

      const newMovies = await movieModel.create(obj);
      res.status(201).json(newMovies);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async putMovie(req, res) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const obj = {
        title,
        overview,
        poster_path,
        popularity: parseFloat(popularity),
        tags,
      };

      console.log(obj, "ini obj di put <<<<<");
      const movies = await movieModel.update(req.params.id, obj);
      res.status(200).json(movies);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async deleteMovie(req, res) {
    try {
      const movies = await movieModel.delete(req.params.id);

      if (movies.result.n === 1) {
        res.status(200).json({ message: "Delete Success" });
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = movieContorller;
