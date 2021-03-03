import React, { useState, useEffect } from 'react';

import '../scss/Item.scss';
import api from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';
import db from '../localdb';
import { LikesHeart } from './index';
const baseUrl = 'http://du9yuz2ex8zdk.cloudfront.net/';

const Item = props => {
	const { user, isAuthenticated } = useAuth0();
	const [cartText, setCartText] = useState('Add to Cart');

	async function addToCart() {
		const defaultText = cartText;
		setCartText('Adding ...');
		if (isAuthenticated) {
			console.log('entre');
			let response = await api.cart().addItem(user.sub.split('|')[1], props.item._id, 1, 'S');
			console.log(response);
			if (response.error) {
				setCartText('Error adding item');
				setTimeout(() => {
					setCartText(defaultText);
				}, 2000);
			} else {
				setCartText('Added To Cart!');
				setTimeout(() => {
					setCartText(defaultText);
				}, 2000);
			}
		} else {
			setCartText('Adding ...');
			setTimeout(() => {
				let records = db.queryAll('cartItem', {
					query: { itemId: props.item._id, size: 'S' },
				});
				if (records.length > 0) {
					db.update('cartItem', { itemId: props.item._id, size: 'S' }, function (row) {
						row.quantity += 1;

						return row;
					});
					db.commit();
				} else {
					db.insert('cartItem', { itemId: props.item._id, quantity: 1, size: 'S' });
					db.commit();
				}
				setCartText('Added to Cart!');
			}, 1000);

			setTimeout(() => {
				setCartText(defaultText);
			}, 2000);
		}
	}

	return (
		<div id='item'>
			<div id='image-container'>
				<img
					id='item-image'
					alt='clothing article'
					src={baseUrl + props.item.fileName}
					onClick={e => {
						e.preventDefault();
						let link = baseUrl + props.item.fileName;
						let item = props.item;
						item.fileName = baseUrl + item.fileName;
						props.redirect(props.item.title, link, item);
					}}
				/>
				<div
					id='image-button'
					onClick={e => {
						e.preventDefault();
						addToCart();
					}}>
					{cartText}
				</div>
			</div>
			<div id='info-container'>
				<div className='flex'>
					<h6>{props.item.title}</h6>
					<LikesHeart itemId={props.item._id} />
				</div>
				<p>
					Price: <strong>${props.item.price}</strong>
				</p>
			</div>
		</div>
	);
};

export default Item;
