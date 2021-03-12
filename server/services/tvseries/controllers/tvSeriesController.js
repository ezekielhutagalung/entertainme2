const tvSeriesModel = require("../model/tvSeriesModel");

class tvSeriesController {
  static async getTvSeries(req, res) {
    try {
      const movies = await tvSeriesModel.find();
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async postTvSeries(req, res) {
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

      const newMovies = await tvSeriesModel.create(obj);
      res.status(201).json(newMovies.ops[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async findTvSeries(req, res) {
    try {
      const movie = await tvSeriesModel.findOne(req.params.id);
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

  static async putTvSeries(req, res) {
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
      const movies = await tvSeriesModel.update(req.params.id, obj);
      res.status(200).json(movies.ops[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async deleteTvSeries(req, res) {
    try {
      const movies = await tvSeriesModel.delete(req.params.id);

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

module.exports = tvSeriesController;
