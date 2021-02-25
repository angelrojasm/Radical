import React, { useState, useEffect } from 'react';
import TopNav from '../Components/TopNav';
import Footer from '../Components/Footer';
import CartItem from '../Components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../scss/likes.scss';
import api from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';

const baseUrl = 'http://du9yuz2ex8zdk.cloudfront.net/';

const Likes = props => {
	const { user, isAuthenticated } = useAuth0();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		console.log(isAuthenticated);
		async function getData() {
			let productsArr = await api.likes().getItems(user.sub.split('|')[1]);
			let temp = [];
			for (const item of productsArr.content) {
				let entry = await api.item().getItem(item.itemId);
				temp.push(entry.item);
			}
			setProducts(temp);
		}
		if (isAuthenticated) {
			getData();
		}
	}, [isAuthenticated]);

	function fillItemList() {
		return products.map((item, index) => {
			if (index === products.length - 1) {
				return (
					<div key={index} id='likes-item-entry' className='body'>
						<CartItem likes={true} image={baseUrl + item.fileName} title={item.title} />
						<div id='price-section'>
							<p>
								<strong>RD${item.price}</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon id='delete' icon={faHeart} />
								<span>Unlike</span>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div key={index} className='body' id='likes-item-entry'>
						<CartItem likes={true} image={baseUrl + item.fileName} title={item.title} />
						<div id='price-section'>
							<p>
								<strong>RD${item.price}</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon id='delete' icon={faHeart} />
								<span>Unlike</span>
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
			{products.length === 0 && <h3>No Items In Likes</h3>}
			<Footer id='footer' position='relative' bottom='0' />
		</div>
	);
};
export default Likes;
