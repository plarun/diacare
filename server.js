const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")

const users = require("./routes/api/users")
const patient = require("./routes/api/patient")
const doctor = require("./routes/api/doctor")

const dailyCheckServer = require("./checker/dailyCheckServer")

const app = express()

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Passport middleware
app.use(passport.initialize())

// Passport config
require("./config/passport")(passport)

// DataBase Config
const db = require("./config/keys").mongoURI

// Connect to MongoDB
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.log(err))

// Routes
app.use("/api/users", users)
app.use("/api/patient", patient)
app.use("/api/doctor", doctor)

// dailyCheckServer()

// Server static assets if in production
// if (process.env.NODE_ENV === "production") {
// 	// Set static folder
// 	app.use(express.static("client/build"))

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
// 	})
// }

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server running in ${port}`))
