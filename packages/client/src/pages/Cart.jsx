import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../Components/TopNav';
import Footer from '../Components/Footer';
import CartItem from '../Components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../scss/Cart.scss';
import api from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';
import db from '../localdb';

const baseUrl = 'http://du9yuz2ex8zdk.cloudfront.net/';

const Cart = props => {
	const { user, isAuthenticated } = useAuth0();
	const [products, setProducts] = useState([]);
	const [canLoad, setCanLoad] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setCanLoad(true);
		}, 100);
	}, []);

	useEffect(() => {
		async function getOnlineData() {
			let productsArr = await api.cart().getItems(user.sub.split('|')[1]);
			let temp = [];
			for (let i = 0; i < productsArr.content.length; i++) {
				let entry = await api.item().getItem(productsArr.content[i].itemId);
				temp.push({
					data: entry.item,
					size: productsArr.content[i].size,
					quantity: productsArr.content[i].quantity,
				});
			}
			setProducts(temp);
		}
		async function getLocalData() {
			let productsArr = db.queryAll('cartItem');
			let temp = [];
			for (let i = 0; i < productsArr.length; i++) {
				let entry = await api.item().getItem(productsArr[i].itemId);
				temp.push({
					data: entry.item,
					size: productsArr[i].size,
					quantity: productsArr[i].quantity,
				});
			}
			setProducts(temp);
		}
		if (canLoad) {
			isAuthenticated ? getOnlineData() : getLocalData();
		}
	}, [canLoad]);

	function fillTable() {
		return products.map((item, index) => {
			if (index === products.length - 1) {
				return (
					<tr key={index} style={{ marginRight: '10vw' }}>
						<td>
							<CartItem
								image={baseUrl + item.data.fileName}
								title={item.data.title}
								size={item.size}
							/>
						</td>
						<td>
							<input
								type='number'
								name='Quantity'
								id='quantity-input'
								value={item.quantity}
								min='1'
								step='1'
							/>
						</td>
						<td>
							<div id='price-section'>
								<p>
									<strong>RD${item.data.price}</strong>
								</p>
								<div id='delete-icon'>
									<FontAwesomeIcon id='delete' icon={faTrash} />
									<span>Remove</span>
								</div>
							</div>
						</td>
					</tr>
				);
			} else {
				return (
					<tr className='body' key={index} style={{ marginRight: '10vw' }}>
						<td>
							<CartItem
								image={baseUrl + item.data.fileName}
								title={item.data.title}
								size={item.size}
							/>
						</td>
						<td>
							<input
								type='number'
								name='Quantity'
								id='quantity-input'
								value={item.quantity}
								min='1'
								step='1'
							/>
						</td>
						<td>
							<div id='price-section'>
								<p>
									<strong>RD${item.data.price}</strong>
								</p>
								<div id='delete-icon'>
									<FontAwesomeIcon id='delete' icon={faTrash} />
									<span>Remove</span>
								</div>
							</div>
						</td>
					</tr>
				);
			}
		});
	}
	function fillItemList() {
		return products.map((item, index) => {
			if (index === products.length - 1) {
				return (
					<div key={index} id='cart-item-entry'>
						<CartItem
							image={baseUrl + item.data.fileName}
							title={item.data.title}
							size={item.size}
						/>
						<div id='price-section'>
							<p>
								<strong>RD${item.data.price}</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon id='delete' icon={faTrash} />
								<span>Remove</span>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div key={index} className='body' id='cart-item-entry'>
						<CartItem
							image={baseUrl + item.data.fileName}
							title={item.data.title}
							size={item.size}
						/>
						<div id='price-section'>
							<p>
								<strong>RD${item.data.price}</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon id='delete' icon={faTrash} />
								<span>Remove</span>
							</div>
						</div>
					</div>
				);
			}
		});
	}

	useEffect(() => {});
	return (
		<div id='cart'>
			<TopNav isBordered={true} />
			<div id='cart-meta'>
				<h3>Shopping Cart</h3>
				<p>3 Items in Cart</p>
			</div>
			<table className='show-desktop' id='cart-table'>
				<thead>
					<tr id='table-header'>
						<th style={{ width: '55vw' }}>Item</th>
						<th style={{ width: '15vw' }}>Qty</th>
						<th style={{ width: '5vw' }}>Price</th>
					</tr>
				</thead>
				<tbody>{fillTable()}</tbody>
			</table>
			<div className='show-mobile' id='cart-items'>
				{fillItemList()}
			</div>
			<hr />
			<p id='total-price'>Total: $1,800.00</p>
			<Link to={{ pathname: '/checkout' }}>
				<button id='checkout-button'>CHECKOUT</button>
			</Link>
			<Footer position='relative' bottom='0' />
		</div>
	);
};
export default Cart;
