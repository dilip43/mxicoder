const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, "Please enter your name!"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email!"],
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minLength: [4, "Password should be greater than 4 characters"],
		select: false,
	},
	phoneNumber: {
		type: Number,
	},
});

userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this_id }, "hello dear", {
		expiresIn: "7d",
	});
};

module.exports = mongoose.model("User", userSchema);
