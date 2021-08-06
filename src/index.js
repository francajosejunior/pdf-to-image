const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { convert } = require("./pdf2png");
const bodyParser = require("body-parser");
const router = express.Router();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("🖥 Applicatin to convert pdf  to png");
});

router.post("/", (req, res) => {
  convert(req.body.pdf)
    .then(image =>
      res.json({
        image,
      })
    )
    .catch(error => {
      res.send({
        status: 500,
        error: error.toString(),
      });
    });
});
app.use("/pdf2png", router);

app.listen(process.env.PORT || 3232, _ => console.log("App running 🚀"));
