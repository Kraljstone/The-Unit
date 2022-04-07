const express = require("express");

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.get("/data", (req, res) => {
  res.json({
    colorOne: {
      color: "#ff0000",
      name: "Red",
    },
    colorThree: {
      color: "#00b300",
      name: "Green",
    },
    colorTwo: {
      color: "#0000ff",
      name: "Blue",
    },
    colorFour: {
      color: "#000000",
      name: "Black",
    },
  });
});

app.listen(3001);
