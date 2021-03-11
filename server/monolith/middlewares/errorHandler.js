function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "Not Found":
      res.status(404).json({ errors: "Not Found" });
      break;
    default:
      res.status(500).json({ errors: "Internal Server Error" });
  }
}

module.exports = errorHandler;
