import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../css/Header.css';

export const Header = props => {
	const [logoPosition, setLogoPosition] = useState(0);
	function handleMouseOver() {
		props.showSlider();
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
		<div id='header' style={{ position: props.position, top: props.top }}>
			<div className='leftside'>
				<FontAwesomeIcon className='toggle' icon={faBars} size='2x' onMouseOver={handleMouseOver} />

				<div id='logo' style={{ position: 'relative', left: logoPosition }}></div>
			</div>
			<div className='rightside'>
				<FontAwesomeIcon className='icon' icon={faUser} size={props.resize ? 'lg' : '2x'} />
				<FontAwesomeIcon
					className='icon'
					id='heart'
					icon={faHeart}
					size={props.resize ? 'lg' : '2x'}
				/>
				<FontAwesomeIcon className='icon' icon={faShoppingCart} size={props.resize ? 'lg' : '2x'} />
			</div>
		</div>
	);
};
