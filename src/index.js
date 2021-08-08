const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { convert } = require("./pdf2png");
const bodyParser = require("body-parser");
const router = express.Router();
const port = process.env.PORT || 3232;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("🖥 Applicatin to convert pdf  to png");
});

router.post("/", (req, res) => {
  console.log("POST");
  convert(req.body.pdf)
    .then(image => {
      res.json({
        image,
      });
    })
    .catch(error => {
      res.send({
        status: 500,
        error: error.toString(),
      });
    })
    .finally(() => {
      console.log("API execulted " + new Date());
    });
});
app.use("/pdf2png", router);

app.listen(port, _ =>
  console.log(
    "App running in " + process.env.NODE_ENV,
    `Listen ${port} port 🚀`
  )
);
