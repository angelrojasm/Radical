import React from 'react';
import '../css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

export const Footer = props => {
	return (
		<div id='footer' style={{ position: props.position, top: props.top }}>
			<p> © Radical 2020</p>
			<div className='right'>
				<span>Find us on</span>
				<div className='socials'>
					<a href='https://www.instagram.com/radical_rd' target='_blank'>
						<FontAwesomeIcon className='icons instagram' size='2x' icon={faInstagram} />
					</a>
				</div>
			</div>
		</div>
	);
};
