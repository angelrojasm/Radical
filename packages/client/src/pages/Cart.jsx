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
	const [removeText, setRemoveText] = useState({});
	const [cartMessage, setCartMessage] = useState('Loading Cart...');
	useEffect(() => {
		setTimeout(() => {
			setCanLoad(true);
		}, 1400);
	}, []);

	useEffect(() => {
		if (canLoad) {
			if (products.length === 0) {
				setCartMessage('Cart is Empty!');
			}
		}
	}, [products]);
	useEffect(() => {
		async function getOnlineData() {
			let productsArr = await api.cart().getItems(user.sub.split('|')[1]);
			let temp = [];
			let tempText = {};
			for (let i = 0; i < productsArr.content.length; i++) {
				let entry = await api.item().getItem(productsArr.content[i].itemId);
				temp.push({
					data: entry.item,
					size: productsArr.content[i].size,
					quantity: productsArr.content[i].quantity,
				});
				tempText[`${productsArr.content[i].itemId}`] = 'Remove';
			}
			setProducts(temp);
			setRemoveText(tempText);
		}
		async function getLocalData() {
			let productsArr = db.queryAll('cartItem');
			let temp = [];
			let tempText = {};
			for (let i = 0; i < productsArr.length; i++) {
				let entry = await api.item().getItem(productsArr[i].itemId);
				temp.push({
					data: entry.item,
					size: productsArr[i].size,
					quantity: productsArr[i].quantity,
				});
				tempText[`${productsArr[i].itemId}`] = 'Remove';
			}
			setProducts(temp);
			setRemoveText(tempText);
		}
		if (canLoad) {
			isAuthenticated ? getOnlineData() : getLocalData();
		}
	}, [canLoad]);

	async function removeFromCart(itemId) {
		if (isAuthenticated) {
			setRemoveText({
				...removeText,
				[`${itemId}`]: 'Removing...',
			});
			let response = await api.cart().removeItem(user.sub.split('|')[1], itemId);
			if (response.error) {
				setRemoveText({
					...removeText,
					[`${itemId}`]: 'Error removing Item.',
				});
				setTimeout(() => {
					setRemoveText({
						...removeText,
						[`${itemId}`]: 'Remove',
					});
				}, 1500);
			} else {
				setRemoveText({
					...removeText,
					[`${itemId}`]: 'Removed!',
				});
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			}
		} else {
			setRemoveText({
				...removeText,
				[`${itemId}`]: 'Removing...',
			});
			setTimeout(() => {
				db.deleteRows('cartItem', { itemId: itemId });
				db.commit();
			}, 1500);
			setTimeout(() => {
				setRemoveText({
					...removeText,
					[`${itemId}`]: 'Removed!',
				});
				window.location.reload();
			}, 1500);
		}
	}
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
									<strong>RD${item.data.price}.00</strong>
								</p>
								<div id='delete-icon'>
									<FontAwesomeIcon
										id='delete'
										icon={faTrash}
										onClick={e => {
											e.preventDefault();
											removeFromCart(item.data._id);
										}}
									/>
									<span>{removeText === {} ? '' : removeText[`${item.data._id}`]}</span>
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
									<strong>RD${item.data.price}.00</strong>
								</p>
								<div id='delete-icon'>
									<FontAwesomeIcon
										id='delete'
										icon={faTrash}
										onClick={e => {
											e.preventDefault();
											removeFromCart(item.data._id);
										}}
									/>
									<span>{removeText === {} ? '' : removeText[`${item.data._id}`]}</span>
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
								<strong>RD${item.data.price}.00</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon
									id='delete'
									icon={faTrash}
									onClick={e => {
										e.preventDefault();
										removeFromCart(item.data._id);
									}}
								/>
								<span>{removeText === {} ? '' : removeText[`${item.data._id}`]}</span>
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
								<strong>RD${item.data.price}.00</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon
									id='delete'
									icon={faTrash}
									onClick={e => {
										e.preventDefault();
										removeFromCart(item.data._id);
									}}
								/>
								<span>{removeText === {} ? '' : removeText[`${item.data._id}`]}</span>
							</div>
						</div>
					</div>
				);
			}
		});
	}

	function calculatePrice() {
		let x = products;
		let price = 0;

		if (products.length !== 0) {
			for (const item of x) {
				price += Number(item.data.price) * Number(item.quantity);
			}
		}
		return price;
	}

	return (
		<div id='cart'>
			<TopNav isBordered={true} />
			<div id='cart-meta'>
				<h3>Shopping Cart</h3>
				<p>{products.length} Items in Cart</p>
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
				{products.length === 0 && (
					<h4 style={{ textAlign: 'center', position: 'relative', top: '40%' }}>
						{cartMessage}
					</h4>
				)}
			</table>
			<div className='show-mobile' id='cart-items'>
				{fillItemList()}
				{products.length === 0 && <h4 style={{ textAlign: 'center' }}>{cartMessage}</h4>}
			</div>
			<hr />
			<p id='total-price'>Total: RD${calculatePrice()}.00</p>
			<Link to={{ pathname: '/checkout' }}>
				<button id='checkout-button'>CHECKOUT</button>
			</Link>
			<Footer position='relative' bottom='0' />
		</div>
	);
};
export default Cart;
