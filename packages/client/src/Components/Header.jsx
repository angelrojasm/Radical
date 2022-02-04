import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import db from '../localdb';
import api from '../api/api';
import '../scss/Header.scss';

const Header = props => {
	const [logoPosition, setLogoPosition] = useState(0);
	const { user, loginWithPopup, isAuthenticated, logout } = useAuth0();
	const [refresh, setRefresh] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [cartNum, setCartNum] = useState(0);

	useEffect(() => {
		isAuthenticated ? setLoggedIn(true) : setLoggedIn(false);
	}, [isAuthenticated]);

	useEffect(() => {
		if (refresh) {
			if (isAuthenticated) {
				window.location = window.location.origin;
			}
		}
	}, [refresh]);

	useEffect(() => {
		const getData = async () => {
			if (isAuthenticated) {
				const userId = user.sub.split('|')[1];
				setCartNum(await api.cart().getItems(userId).length);
			} else {
				let productsArr = db.queryAll('cartItem');
				setCartNum(productsArr.length);
			}
		};
		getData();
	}, []);
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
							<button
								className='my-dropdown-item'
								onClick={async () => {
									await loginWithPopup();
									setRefresh(true);
								}}>
								Log in
							</button>
						)}
						<Link
							className='dropdown-item'
							style={{ width: '90%', margin: '0 auto', textAlign: 'center' }}
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
					<div id='cart-container'>
						<FontAwesomeIcon className='icon' icon={faShoppingCart} />
						{cartNum > 0 && <p class='cart-num'>{cartNum}</p>}
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
