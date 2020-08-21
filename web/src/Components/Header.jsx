import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = props => {
	const [logoPosition, setLogoPosition] = useState(0);
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
		props.width === '20vw' ? (val = '15vw') : (val = '21vw');
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
				<FontAwesomeIcon className='toggle' icon={faBars} size='2x' onMouseOver={handleMouseOver} />

				<div id='logo' style={{ position: 'relative', left: logoPosition }}></div>
			</div>
			<div className='rightside'>
				<div className='dropdown'>
					<button
						type='button'
						id='user-dropdown'
						className='dropdown-button'
						data-toggle='dropdown'>
						<FontAwesomeIcon className='icon' icon={faUser} size={props.resize ? 'lg' : '2x'} />
					</button>
					<div className='dropdown-menu'>
						<Link
							className='dropdown-item'
							to={{
								pathname: '/login',
							}}>
							Log in / Register
						</Link>
						<Link
							className='dropdown-item'
							to={{
								pathname: '/profile',
							}}>
							My Profile
						</Link>
					</div>
				</div>
				<Link
					to={{
						pathname: '/likes',
					}}>
					<FontAwesomeIcon
						className='icon'
						id='heart'
						icon={faHeart}
						size={props.resize ? 'lg' : '2x'}
					/>
				</Link>
				<Link to={{ pathname: '/cart' }}>
					<FontAwesomeIcon
						className='icon'
						icon={faShoppingCart}
						size={props.resize ? 'lg' : '2x'}
					/>
				</Link>
			</div>
		</div>
	);
};

export default Header;
