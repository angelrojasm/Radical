import React, { useState, useEffect } from 'react';
import { TopNav, Breadcrumb, Footer, LikesHeart } from '../Components/index';
import '../scss/ItemProfile.scss';
import api from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';
import db from '../localdb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const ItemProfile = props => {
	const [cartText, setCartText] = useState('Add to Cart');
	const { user, isAuthenticated } = useAuth0();
	const [sizeSelect, setSizeSelect] = useState('S');

	async function addToCart() {
		const defaultText = cartText;
		setCartText('Adding ...');
		if (isAuthenticated) {
			let response = await api
				.cart()
				.addItem(user.sub.split('|')[1], props.location.state.item._id, 1, sizeSelect);
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
			setTimeout(() => {
				let records = db.queryAll('cartItem', {
					query: { itemId: props.location.state.item._id, size: sizeSelect },
				});
				if (records.length > 0) {
					db.update('cartItem', { itemId: props.location.state.item._id }, function (row) {
						row.quantity += 1;

						return row;
					});
					db.commit();
				} else {
					db.insert('cartItem', {
						itemId: props.location.state.item._id,
						quantity: 1,
						size: sizeSelect,
					});
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
		<div id='item-profile'>
			<TopNav isBordered={true} />
			<div id='body'>
				<Breadcrumb
					isProfile={true}
					categoryName={props.match.params.name}
					itemName={props.match.params.item}
				/>
				<div className='flex'>
					<img
						id='profile-image'
						src={props.location.state.item.fileName}
						alt='picture profile'
					/>
					<div id='product-info-body'>
						<h2>{props.location.state.item.title}</h2>
						<div id='ratings'>
							<div id='stars'>
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
							</div>
							<h3>35 Reviews</h3>
						</div>
						<h3 id='price'>RD${props.location.state.item.price}.00</h3>
						<div id='size'>
							<h4>Size: </h4>
							<select
								id='size-select'
								value={sizeSelect}
								onChange={e => {
									setSizeSelect(e.target.value);
								}}>
								<option value='S'>S</option>
								<option value='M'>M</option>
								<option value='L'>L</option>
							</select>
						</div>
						<div id='options'>
							<button
								onClick={e => {
									e.preventDefault();
									addToCart();
								}}>
								{cartText}
							</button>
							<div id='icon-div'>
								<LikesHeart itemId={props.location.state.item._id} />
								<h4>Add to Wishlist</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer position='relative' bottom='-10vh' />
		</div>
	);
};
export default ItemProfile;
