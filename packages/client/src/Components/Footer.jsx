import React, { useState, useEffect } from 'react';
import '../scss/Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = props => {
	const [color, setColor] = useState('black');
	useEffect(() => {
		if (props.isHome) {
			if (props.width < 1200) {
				setColor('white');
			}
		}
	}, []);
	return (
		<div id='footer' style={{ position: props.position, bottom: props.bottom }}>
			<div className='leftside'>
				<p style={{ color: color }}> © Radical 2020</p>
			</div>
			<div className='rightside' style={{ color: color }}>
				<span>Find us on</span>
				<a
					href='https://www.instagram.com/radical_rd'
					target='_blank'
					rel='noopener noreferrer'>
					<FontAwesomeIcon
						className='icons instagram'
						style={{ color: color }}
						size='2x'
						icon={faInstagram}
					/>
				</a>
			</div>
		</div>
	);
};

export default Footer;
