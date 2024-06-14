const express = require("express");
const mailRouter = require("./Routes/mailRoute");
const app = express();
const cors = require("cors");
const port = 3000;

const allowedOrigins = ["http://localhost:5173", "https://www.vcwebstudio.com", "https://vc-web-studio.vercel.app"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions)); // Applying CORS middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/Mail", mailRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
