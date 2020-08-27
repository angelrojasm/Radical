import React, { useState } from 'react';
import '../css/signup.css';
import { Link, useHistory } from 'react-router-dom';

const SignUp = props => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const clear = () => {
		setName('');
		setPassword('');
		setEmail('');
	};
	/*async function handleSubmit() {
		let user = {
			name: name,
			email: email,
			password: password,
		};
		if (name === '') {
			alert('Your name must not be empty!');
		} else if (email === '') {
			alert('Your email must not be empty!');
		} else if (password === '') {
			alert('Your password must not be empty!');
		} else {
			try {
				let req = await fetch(`/signup?email=${email}&password=${password}`, {
					method: 'POST',
				});
				let x = await req.json();
				console.log(x);
				if (x.result === email) {
					alert('Signed Up Succesfully!');
					window.localStorage.setItem('logged', `${email}`);
					window.location.reload();
				}
			} catch (error) {
				alert('Incorrect Format');
				console.log(error);
			}
		}

		setTimeout(() => {
                history.push("/");
            }, 1000);
        }
	}
	*/
	return (
		<div id='register-component'>
			<div id='register-form-container'>
				<h3 id='form-title'>Sign Up</h3>
				<div className='register-form-group'>
					<label htmlFor='Name'>What's your username?</label>
					<input
						type='text'
						name='username'
						className='form-control'
						aria-describedby='emailHelp'
						required
						value={name}
						onChange={e => {
							e.preventDefault();
							setName(e.target.value);
						}}
					/>
				</div>
				<div className='register-form-group'>
					<label htmlFor='exampleInputEmail1'>Email address</label>
					<input
						type='email'
						className='form-control'
						aria-describedby='emailHelp'
						required
						name='email'
						value={email}
						onChange={e => {
							e.preventDefault();
							setEmail(e.target.value);
						}}
					/>
					<small id='emailHelp' className='form-text text-muted'>
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className='register-form-group'>
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
					Already have an account?
					<span
						id='sign-up-link'
						onClick={e => {
							e.preventDefault();
							props.toggle();
						}}>
						{' '}
						Log In
					</span>
				</p>
				<button className='btn btn-primary'>Sign up</button>
			</div>
		</div>
	);
};

export default SignUp;
