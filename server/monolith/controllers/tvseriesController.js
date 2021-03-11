const tvSeriesModel = require("../models/tvseriesModel");

class tvSeriesClass {
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
      res.status(201).json(newMovies);
    } catch (err) {
      console.log(err);
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
      res.status(200).json(movies);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async deleteTvSeries(req, res) {
    try {
      const movies = await tvSeriesModel.delete(req.params.id);

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

module.exports = tvSeriesClass;
