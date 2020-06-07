import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../css/Header.css';

export const Header = props => {
	function handleMouseEnter() {
		props.showSlider();
	}
	return (
		<div id='header' style={{ position: props.position, top: props.top }}>
			<div className='leftside'>
				<FontAwesomeIcon
					className='toggle'
					icon={faBars}
					size='2x'
					onMouseOver={handleMouseEnter}
				/>

				<div id='logo'></div>
			</div>
			<div className='rightside'>
				<FontAwesomeIcon className='icon' icon={faUser} size='2x' />
				<FontAwesomeIcon className='icon' id='heart' icon={faHeart} size='2x' />
				<FontAwesomeIcon className='icon' icon={faShoppingCart} size='2x' />
			</div>
		</div>
	);
};
