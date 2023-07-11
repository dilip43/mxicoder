const mongoose = require("mongoose");

const connectDB = () => {
	mongoose
		.connect("mongodb://127.0.0.1:27017/mxi", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((data) => {
			console.log(
				`mongodb connected with server ${data.connection.host}`
			);
		});
};

module.exports = connectDB;
