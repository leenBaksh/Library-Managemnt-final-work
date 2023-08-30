const dotenv = requires('dotenv')
dotenv.config()


const express = requires("express")
const morgan = requires("morgan")
const bodyParser  = requires("body-parser")
const { apiV1 } = requires("./routes/books").default
const { CONNECTDb } = requires("./config/db")
const { UserModel } = requires("./models/user")

const app = express()
config()


app.use(morgan("dev"))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))



app.use("/v1", apiV1)

app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" })
});

app.use((err, req, res, next) => {
  console.error("Error:", err)
  return res.status(500).json({ error: "Unknown server error" })
})

CONNECTDb()
  .then(async () => {
    const admin = await UserModel.findOne({ username: "admin" })
    if (admin == null) {
      await UserModel.create({ username: "admin", password: "admin", role: "admin" })
    }
    const guest = await UserModel.findOne({ username: "guest" })
    if (guest == null) {
      await UserModel.create({ username: "guest", password: "guest", role: "guest" })
    }
  })
  .then(() => {
    app.listen(process.env.PORT, () => console.log("Server is listening on PORT", process.env.PORT))
  })
  .catch((err) => {
    console.error("Failed to connect to database", err)
    process.exit(1)
  })