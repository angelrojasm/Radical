import React, { useState, useEffect } from 'react';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import TopNav from '../Components/TopNav';

const Auth = props => {
	const [hasAccount, setHasAccount] = useState(true);

	function toggleHasAccount() {
		setHasAccount(!hasAccount);
	}
	return (
		<div
			className='auth-container'
			style={{ backgroundColor: 'whitesmoke', width: '100vw', height: '100vh' }}>
			<TopNav isBordered={true} />
			{hasAccount ? <Login toggle={toggleHasAccount} /> : <SignUp toggle={toggleHasAccount} />}
		</div>
	);
};
export default Auth;
