import React, { useState, useEffect } from 'react';

import '../css/Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

const baseUrl = 'http://du9yuz2ex8zdk.cloudfront.net/';

const Item = props => {
	const [heartisVisible, setHeartIsVisible] = useState('block');
	const [solidHeartIsVisible, setSolidHeartIsVisible] = useState('none');

	function handleMouseIn(e) {
		e.preventDefault();
		setHeartIsVisible('none');
		setSolidHeartIsVisible('block');
	}

	function handleMouseOut(e) {
		e.preventDefault();
		setSolidHeartIsVisible('none');
		setHeartIsVisible('block');
	}
	return (
		<div id='item'>
			<div id='image-container'>
				<img
					id='item-image'
					alt='clothing article'
					src={baseUrl + props.item.image}
					onClick={e => {
						e.preventDefault();
						let link = baseUrl + props.item.image;
						props.redirect(props.item.title, link);
					}}
				/>
				<div
					id='image-button'
					onClick={() => {
						console.log('clicked');
					}}>
					Add to Cart
				</div>
			</div>
			<div id='info-container'>
				<div className='flex'>
					<h6>{props.item.title}</h6>
					<FontAwesomeIcon
						className='like'
						icon={regHeart}
						onMouseEnter={e => {
							handleMouseIn(e);
						}}
						style={{ display: heartisVisible }}
						size='lg'
					/>
					<FontAwesomeIcon
						className='like'
						icon={solidHeart}
						onMouseLeave={e => {
							handleMouseOut(e);
						}}
						style={{ display: solidHeartIsVisible, color: 'red' }}
						size='lg'
					/>
				</div>
				<p>
					Price: <strong>${props.item.price}</strong>
				</p>
			</div>
		</div>
	);
};

export default Item;
