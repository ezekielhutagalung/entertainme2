const { getDatabase } = require("../config/monggodb");
const { ObjectId } = require("mongodb");

class tvSeriesModel {
  static find() {
    return getDatabase().collection("tvSeries").find().toArray();
  }

  static create(tvseries) {
    return getDatabase().collection("tvSeries").insertOne(tvseries);
  }

  static findOne(id) {
    return getDatabase()
      .collection("tvSeries")
      .findOne({ _id: ObjectId(`${id}`) });
  }

  static update(id, tvseries) {
    return getDatabase()
      .collection("tvSeries")
      .replaceOne({ _id: ObjectId(id) }, tvseries, { upsert: true });
  }

  static delete(id) {
    return getDatabase()
      .collection("tvSeries")
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = tvSeriesModel;
