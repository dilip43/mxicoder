import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const PhoneVerify = () => {
	const [code, setCode] = useState("");
	const navigate = useNavigate();

	const postVerification = async () => {
		await axios
			.post(
				"http://localhost:8000/api/verification",
				{
					code,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((data) => {
				if (data.data.error_message) {
					message.error(data.data.error_message);
				} else {
					localStorage.setItem("username", "xfgh");
					navigate("/dashboard");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postVerification();
		setCode("");
		navigate("/dashboard");
	};
	return (
		<div className='verify'>
			<h2 style={{ marginBottom: "30px" }}>Verify your Phone number</h2>
			<form className='verify__form' onSubmit={handleSubmit}>
				<label htmlFor='code' style={{ marginBottom: "10px" }}>
					A code has been sent to your phone
				</label>
				<input
					type='text'
					name='code'
					id='code'
					className='code'
					value={code}
					onChange={(e) => setCode(e.target.value)}
					required
				/>
				<button className='codeBtn'>AUTHENTICATE</button>
			</form>
		</div>
	);
};

export default PhoneVerify;
