const port = 80;
const express = require("express");
const app = express();
const automation = require("./Puppeteer/test");

app.get("/", automation);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server.`);
  err.status = "Fail to load..";
  err.statusCode = 404;
  next(err);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 400;
  error.status = error.status || "Error";
  res.status(error.statusCode).json({
    success: false,
    status: error.statusCode,
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port number : ${port} `);
});
