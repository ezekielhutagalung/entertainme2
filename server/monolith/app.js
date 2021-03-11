const express = require("express");
const { connect } = require("./config/mongodb");
const app = express();
const PORT = 3000;
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

connect()
  .then(async (db) => {
    console.log("mongo berhasil terhubung");

    // const testercollection = db.collection("movies");

    // const tester = await testercollection.find().toArray();
    // console.log(tester);

    app.listen(PORT, () => {
      console.log("Sudah berjalan di port", PORT);
    });
  })
  .catch((err) => {
    console.log(err, "Mongo Connect Error");
  });
