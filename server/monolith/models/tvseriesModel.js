const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class tvSeriesModel {
  static find() {
    return getDatabase().collection("tvSeries").find().toArray();
  }

  static create(movie) {
    return getDatabase().collection("tvSeries").insertOne(movie);
  }

  static update(id, movie) {
    return getDatabase()
      .collection("tvSeries")
      .replaceOne({ _id: ObjectId(id) }, movie, { upsert: true });
  }

  static delete(id) {
    return getDatabase()
      .collection("tvSeries")
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = tvSeriesModel;
