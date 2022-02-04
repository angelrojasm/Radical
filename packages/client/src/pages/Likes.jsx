import React, { useState, useEffect } from 'react';
import TopNav from '../Components/TopNav';
import Footer from '../Components/Footer';
import CartItem from '../Components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../scss/likes.scss';
import api from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Likes = props => {
	const { user, isAuthenticated } = useAuth0();
	const [products, setProducts] = useState([]);
	const [likeText, setLikeText] = useState({});
	const [likesMessage, setLikesMessage] = useState('Loading Likes...');

	useEffect(() => {
		async function getData() {
			let productsArr = await api.likes().getItems(user.sub.split('|')[1]);
			let temp = [];
			let templikeObj = {};
			for (const item of productsArr.content) {
				let entry = await api.item().getItem(item.itemId);
				temp.push(entry.item);
				templikeObj[`${entry.item._id}`] = 'Liked';
			}
			setProducts(temp);
			setLikeText(templikeObj);
		}
		if (isAuthenticated) {
			getData();
			setTimeout(() => {
				if (products.length === 0) {
					setLikesMessage('No Items in Likes!');
				}
			}, 600);
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (!isAuthenticated) {
			setLikesMessage('You must log in first in order to like items!');
		}
	}, []);
	async function removeFromLikes(itemId) {
		setLikeText({
			...likeText,
			[`${itemId}`]: 'Removing...',
		});
		let response = await api.likes().removeItem(user.sub.split('|')[1], itemId);
		if (response.error) {
			setLikeText({
				...likeText,
				[`${itemId}`]: 'Error removing Item.',
			});
			setTimeout(() => {
				setLikeText({
					...likeText,
					[`${itemId}`]: 'Liked',
				});
			}, 1500);
		} else {
			setLikeText({
				...likeText,
				[`${itemId}`]: 'Removed!',
			});
			setTimeout(() => {
				window.location.reload();
			}, 1500);
		}
	}

	function fillItemList() {
		return products.map((item, index) => {
			if (index === products.length - 1) {
				return (
					<div key={index} id='likes-item-entry' className='body'>
						<CartItem
							likes={true}
							image={baseUrl + item.fileName}
							title={item.title}
							item={item}
						/>
						<div id='price-section'>
							<p>
								<strong>RD${item.price}.00</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon
									id='delete'
									icon={faHeart}
									onClick={e => {
										e.preventDefault();
										removeFromLikes(item._id);
									}}
								/>
								<span>{likeText === {} ? '' : likeText[`${item._id}`]}</span>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div key={index} className='body' id='likes-item-entry'>
						<CartItem
							likes={true}
							image={baseUrl + item.fileName}
							title={item.title}
							item={item}
						/>
						<div id='price-section'>
							<p>
								<strong>RD${item.price}.00</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon
									id='delete'
									icon={faHeart}
									onClick={e => {
										e.preventDefault();
										removeFromLikes(item._id);
									}}
								/>
								<span>{likeText === {} ? '' : likeText[`${item._id}`]}</span>
							</div>
						</div>
					</div>
				);
			}
		});
	}

	return (
		<div id='likes'>
			<TopNav isBordered={true} />
			<div id='likes-meta'>
				<h3>Liked Items</h3>
				<p>{products.length} Items in View</p>
			</div>
			<div id='likes-items'>{fillItemList()}</div>
			{products.length === 0 && <h4 style={{ textAlign: 'center' }}>{likesMessage}</h4>}
			{products.length <= 1 ? (
				<Footer id='footer' position='fixed' bottom='-80vh' />
			) : (
				<Footer id='footer' position='relative' bottom='0' />
			)}
		</div>
	);
};
export default Likes;
