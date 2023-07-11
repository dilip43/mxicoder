import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const postLoginDetails = async () => {
		await axios
			.post(
				"http://localhost:8000/api/login",
				{
					email,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((data) => {
				if (data.data.error_message) {
					alert(data.data.error_message);
				} else {
					navigate("/phone/verify");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postLoginDetails();
		setPassword("");
		setEmail("");
	};

	return (
		<div className='login__container'>
			<h2>Login</h2>
			<form className='login__form' onSubmit={handleSubmit}>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					id='email'
					name='email'
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
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
				<button className='loginBtn'>SIGN IN</button>
				<p>
					Don't have an account?{" "}
					<Link to='/register' className='link'>
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
