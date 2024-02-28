const express = require("express");
const app = express();
const model = require("./models/index")
console.log("🚀 ~ model:", model)

app.use(express.json()); // 


const userRoutes = require("./routes/routes")
app.use(express.json()); // 



app.use('/', userRoutes)

app.get("/", (req, res) => {
  res.send("Express Server is running")
})


app.listen(9000, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`Server running on 9000`)
})
