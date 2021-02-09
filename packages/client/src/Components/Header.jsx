import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../scss/Header.scss';

const Header = props => {
	const [logoPosition, setLogoPosition] = useState(0);
	const { loginWithRedirect, loginWithPopup, isAuthenticated, logout, user } = useAuth0();
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		console.log(isAuthenticated);
		isAuthenticated ? setLoggedIn(true) : setLoggedIn(false);
		if (isAuthenticated) {
			console.log(user);
		}
	}, [isAuthenticated]);

	function handleMouseOver() {
		props.showSlider();
	}
	function styleHeader() {
		return props.isBordered
			? {
					position: props.position,
					top: props.top,
					backgroundColor: 'white',
					boxShadow: '0px 17px 15px -15px rgba(201,195,201,1)',
			  }
			: { position: props.position, top: props.top };
	}

	const handleSlide = () => {
		let val;
		props.width === '20vw' ? (val = '17vw') : (val = '22vw');
		return val;
	};
	useEffect(() => {
		props.offsetFlag === 0 && props.dimensionWidth > 481
			? setLogoPosition(handleSlide)
			: setLogoPosition(0);
	}, [props.offsetFlag]);

	return (
		<div id='header' style={styleHeader()}>
			<div className='leftside'>
				<FontAwesomeIcon className='toggle' icon={faBars} onMouseOver={handleMouseOver} />

				<a href='/'>
					<div id='logo' style={{ position: 'relative', left: logoPosition }}></div>
				</a>
			</div>
			<div className='rightside'>
				<div className='dropdown'>
					<button
						type='button'
						id='user-dropdown'
						className='dropdown-button'
						data-toggle='dropdown'>
						<FontAwesomeIcon className='icon' icon={faUser} />
					</button>
					<div className='dropdown-menu'>
						{loggedIn ? (
							<button
								className='my-dropdown-item'
								onClick={() => logout({ returnTo: window.location.origin })}>
								Logout
							</button>
						) : (
							<button className='my-dropdown-item' onClick={() => loginWithPopup()}>
								Log in
							</button>
						)}
						<Link
							className='dropdown-item'
							to={{
								pathname: '/myprofile',
							}}>
							My Profile
						</Link>
					</div>
				</div>
				<Link
					to={{
						pathname: '/likes',
					}}>
					<FontAwesomeIcon className='icon' id='heart' icon={faHeart} />
				</Link>
				<Link to={{ pathname: '/cart' }}>
					<FontAwesomeIcon className='icon' icon={faShoppingCart} />
				</Link>
			</div>
		</div>
	);
};

export default Header;
