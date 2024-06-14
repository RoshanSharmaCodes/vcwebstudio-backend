const express = require('express')
const mailRouter = require('./Routes/mailRoute')
const app = express()
const cors = require("cors");
const port = 3000

const allowedOrigins = [
    "http://localhost:5173",
    "https://www.vcwebstudio.com",
    "https://vc-web-studio.vercel.app",
  ];

app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
  
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            "The CORS policy for this site does not allow access from the specified origin.";
          return callback(new Error(msg), false);
        }
  
        return callback(null, true);
      },
    })
  );

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/Mail",mailRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})