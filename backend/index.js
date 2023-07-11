const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db/Database");
const user = require("./controller/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", user);

connectDB();

app.listen(8000, () => {
	console.log(`server listening on port 8000`);
});
