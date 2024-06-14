const express = require("express")
const mailRouter = require("./Routes/mailRoute")
const app = express()
const cors = require("cors")
const port = 3000

const allowedOrigins = ["http://localhost:5173", "https://www.vcwebstudio.com", "https://vc-web-studio.vercel.app"]

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: ["GET", "POST"],
}

app.options("*", cors())
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
}
app.use(allowCrossDomain)
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/Mail", mailRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
