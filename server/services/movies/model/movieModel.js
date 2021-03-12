const { getDatabase } = require("../config/monggodb");
const { ObjectId } = require("mongodb");

class movieModel {
  static find() {
    return getDatabase().collection("movies").find().toArray();
  }

  static create(movie) {
    return getDatabase().collection("movies").insertOne(movie);
  }

  static findOne(id) {
    return getDatabase()
      .collection("movies")
      .findOne({ _id: ObjectId(`${id}`) });
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
