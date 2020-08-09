import React from 'react';
import '../css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = props => {
	return (
		<div id='footer' style={{ position: props.position, bottom: props.bottom }}>
			<p> © Radical 2020</p>
			<div className='right'>
				<span>Find us on</span>
				<a href='https://www.instagram.com/radical_rd' target='_blank' rel='noopener noreferrer'>
					<FontAwesomeIcon className='icons instagram' size='2x' icon={faInstagram} />
				</a>
			</div>
		</div>
	);
};

export default Footer;
