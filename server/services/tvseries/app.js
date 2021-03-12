const express = require("express");
const { connect } = require("./config/monggodb");
const app = express();
const PORT = 4002;
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

connect()
  .then(() => {
    console.log("mongo berhasil terhubung");

    app.listen(PORT, () => {
      console.log("Sudah berjalan di port", PORT);
    });
  })
  .catch((err) => {
    console.log(err, "Mongo Connect Error");
  });
