const movieModel = require("../model/movieModel");

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
      const {
        title,
        overview,
        poster_path,
        popularity,
        tags,
        urlMov,
      } = req.body;

      const obj = {
        title,
        overview,
        poster_path,
        popularity: parseFloat(popularity),
        tags,
        urlMov,
      };

      console.log(obj, "ini obj");

      const newMovies = await movieModel.create(obj);
      res.status(201).json(newMovies.ops[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async findOneMovie(req, res) {
    try {
      const movie = await movieModel.findOne(req.params.id);
      console.log(movie);
      if (!movie) {
        res.status(404).json({ message: "Not Found" });
      } else {
        res.status(200).json(movie);
      }
    } catch (err) {
      console.log(err, "ini di error controller");
      res.status(500).json(err);
    }
  }

  static async putMovie(req, res) {
    try {
      const {
        title,
        overview,
        poster_path,
        popularity,
        tags,
        urlMov,
      } = req.body;
      const obj = {
        title,
        overview,
        poster_path,
        popularity: parseFloat(popularity),
        tags,
        urlMov,
      };

      console.log(obj, "ini obj di put <<<<<");
      const movies = await movieModel.update(req.params.id, obj);
      res.status(200).json(movies.ops[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async deleteMovie(req, res) {
    try {
      const movies = await movieModel.delete(req.params.id);

      if (movies.result.n === 1) {
        res.status(200).json({ message: "Delete Success", _id: req.params.id });
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = movieContorller;
