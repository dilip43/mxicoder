import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [tel, setTel] = useState("");
	const navigate = useNavigate();

	const postSingUpDetails = async () => {
		await axios
			.post(
				"http://localhost:8000/api/register",
				{
					email,
					password,
					phoneNumber: tel,
					name: username,
				},

				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((data) => {
				if (data.data.error_message) alert(data.data.error_message);
				else {
					alert(data.data.message);
					navigate("/");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postSingUpDetails();
		setPassword("");
		setEmail("");
		setTel("");
		setUsername("");
	};

	const gotoLoginPage = () => navigate("/");

	return (
		<div className='signup__container'>
			<h2>Sign up</h2>
			<form className='signup__form' onSubmit={handleSubmit}>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					id='email'
					name='email'
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					id='username'
					name='username'
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor='tel'>Phone Number</label>
				<input
					type='tel'
					name='tel'
					id='tel'
					value={tel}
					required
					onChange={(e) => setTel(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					minLength={8}
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='signupBtn'>SIGN UP</button>
				<p>
					Already have an account?{" "}
					<span className='link' onClick={gotoLoginPage}>
						Login
					</span>
				</p>
			</form>
		</div>
	);
};

export default Signup;
