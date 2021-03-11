const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class movieModel {
  static find() {
    return getDatabase().collection("movies").find().toArray();
  }

  static create(movie) {
    return getDatabase().collection("movies").insertOne(movie);
  }

  static update(id, movie) {
    return getDatabase()
      .collection("movies")
      .replaceOne({ _id: ObjectId(id) }, movie, { upsert: true });
  }

  static delete(id) {
    return getDatabase()
      .collection("movies")
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = movieModel;
