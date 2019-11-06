const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/submit", (req, res) => {
  if (req.body.credit.email === "direktor@sbarbank.ru") {
    return res.json({
      approved: true
    });
  } else {
    return res.json({
      approved: false
    });
  }
});

app.listen(3333, "0.0.0.0", () => {
  console.log("Server up");
});
