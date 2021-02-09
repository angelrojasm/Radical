import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../scss/login.scss';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();
	/*
	async function handleSubmit() {
		let user = {
			email: email,
			password: password,
		};
		if (email === '') {
			alert('Your email must not be empty!');
		} else if (password === '') {
			alert('Your password must not be empty!');
		} else {
			try {
				let req = await fetch(`/login?email=${email}&password=${password}`, {
					method: 'POST',
				});
				let x = await req.json();
				console.log(x);
				if (x.result) {
					window.localStorage.setItem('logged', `${email}`);
					alert('Logged in Succesfully!');
					window.location.reload();
				} else {
					alert('incorrect credentials');
				}
			} catch (error) {
				alert('incorrect credentials');
			}
		}
	}
*/
	return (
		<div id='login-component'>
			<div id='login-form-container'>
				<h3 id='form-title'>Log In</h3>
				<div className='form-group'>
					<form>
						<label htmlFor='exampleInputEmail1'>Email address</label>
						<input
							type='email'
							name='email'
							className='form-control'
							aria-describedby='emailHelp'
							required
							value={email}
							onChange={e => {
								e.preventDefault();
								setEmail(e.target.value);
							}}
						/>
						<small id='emailHelp' className='form-text text-muted'>
							We'll never share your email with anyone else.
						</small>
					</form>
				</div>
				<div className='form-group'>
					<label htmlFor='exampleInputPassword1'>Password</label>
					<input
						type='password'
						className='form-control'
						required
						value={password}
						onChange={e => {
							e.preventDefault();
							setPassword(e.target.value);
						}}
					/>
				</div>
				<p id='sign-up-label'>
					Don't have an account?
					<span
						id='sign-up-link'
						onClick={e => {
							e.preventDefault();
							props.toggle();
						}}>
						{' '}
						Sign Up
					</span>
				</p>
				<button className='btn btn-primary'>Sign in</button>
			</div>
		</div>
	);
};

export default Login;
