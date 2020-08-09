import React, { useState, useEffect } from 'react';
import '../css/Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const baseUrl = 'http://du9yuz2ex8zdk.cloudfront.net/';

const Item = props => {
	return (
		<div id='item'>
			<div id='image-container'>
				<img id='item-image' alt='clothing article' src={baseUrl + props.item.image} />
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
					<h5>{props.item.title}</h5>
					<FontAwesomeIcon icon={faHeart} size='lg' />
				</div>
				<p>
					Price: <strong>${props.item.price}</strong>
				</p>
			</div>
		</div>
	);
};

export default Item;
