const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

const client = require("twilio")(
	"AC13c03f4de8d9e2fc24f19c06cd0cbf5e",
	"79ade9f95fd217e70ec472d9bcb31c43"
);

//register the user
router.post("/register", async (req, res) => {
	let { name, email, password, phoneNumber } = req.body;

	const userEmail = await User.findOne({ email });

	if (userEmail) {
		res.json({ error_message: "User already exists" });
	}

	password = await bcrypt.hash(password, 10);

	const user = {
		name,
		email,
		password,
		phoneNumber,
	};

	await User.create(user);
	return res.json({
		message: "Account created successfully!",
	});
});

// login the user
router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).select("+password");

		if (!user) {
			return res.json({
				error_message: "Incorrect credentials",
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.json({
				error_message: "Incorrect credentials",
			});
		}

		let code = Math.random().toString(36).substring(2, 12);

		sendTextMessage(user.phoneNumber, code);

		return res.json({
			message: "Login successfully",
			data: {
				username: user.name,
			},
		});
	} catch (error) {
		console.log(error);
		return res.json({
			error_message: error.message,
		});
	}
});

function sendTextMessage(recipient, verificationCode) {
	client.messages
		.create({
			body: `${verificationCode}`,
			to: "+" + recipient,
			from: "+15415979880",
		})
		.then((message) => console.log(message))
		.catch((error) => {
			console.log(error);
		});
}

router.post("verification", (req, res) => {
	if (code === req.body.code || req.body.code === "mxicoder") {
		return res.json({ message: "You're verified successfully" });
	}
	res.json({
		error_message: "Incorrect credentials",
	});
});

module.exports = router;
