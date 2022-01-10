import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../Components/TopNav';
import Footer from '../Components/Footer';
import CartItem from '../Components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../scss/Cart.scss';
import api from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';
import db from '../localdb';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const baseUrl = 'http://du9yuz2ex8zdk.cloudfront.net/';

const Cart = props => {
	const history = useHistory();
	const { user, isAuthenticated } = useAuth0();
	const [products, setProducts] = useState([]);
	const [canLoad, setCanLoad] = useState(false);
	const [canSendInfo, setCanSendInfo] = useState(false);
	const [removeText, setRemoveText] = useState({});
	const [itemQuantities, setItemQuantities] = useState({});
	const [itemSizes, setItemSizes] = useState({});
	const [cartMessage, setCartMessage] = useState('Loading Cart...');
	const [modalStatus, setModalStatus] = useState({ loading: false, error: false, success: false });
	const [show, setShow] = useState();

	async function getOnlineData() {
		let productsArr = await api.cart().getItems(user.sub.split('|')[1]);
		let temp = [];
		let tempText = {};
		let tempQuantities = {};
		let tempSizes = {};
		for (let i = 0; i < productsArr.content.length; i++) {
			let entry = await api.item().getItem(productsArr.content[i].itemId);
			if (productsArr.content[i].price) {
				temp.push({
					data: entry.item,
					size: productsArr.content[i].size,
					quantity: productsArr.content[i].quantity,
					uniqueId: productsArr.content[i]._id,
					price: productsArr.content[i].price,
					comments: productsArr.content[i].comments,
					color: productsArr.content[i].color,
					designType: productsArr.content[i].designType,
					designImage: productsArr.content[i].designImage,
				});
			} else {
				temp.push({
					data: entry.item,
					size: productsArr.content[i].size,
					quantity: productsArr.content[i].quantity,
					uniqueId: productsArr.content[i]._id,
				});
			}
			tempText[`${productsArr.content[i]._id}`] = 'Remove';
			tempQuantities[`${productsArr.content[i]._id}`] = productsArr.content[i].quantity;
			tempSizes[`${productsArr.content[i]._id}`] = productsArr.content[i].size;
		}
		setProducts(temp);
		setRemoveText(tempText);
		setItemQuantities(tempQuantities);
		setItemSizes(tempSizes);
	}
	async function getLocalData() {
		let productsArr = db.queryAll('cartItem');
		console.log(productsArr);
		let temp = [];
		let tempText = {};
		let tempQuantities = {};
		let tempSizes = {};
		for (let i = 0; i < productsArr.length; i++) {
			let entry = await api.item().getItem(productsArr[i].itemId);
			if (productsArr[i].price) {
				temp.push({
					data: entry.item,
					size: productsArr[i].size,
					quantity: productsArr[i].quantity,
					uniqueId: productsArr[i].ID,
					price: productsArr[i].price,
					comments: productsArr[i].comments,
					color: productsArr[i].color,
					designType: productsArr[i].designType,
					designImage: productsArr[i].designImage,
				});
			} else {
				temp.push({
					data: entry.item,
					size: productsArr[i].size,
					quantity: productsArr[i].quantity,
					uniqueId: productsArr[i].ID,
				});
			}
			tempText[`${productsArr[i].ID}`] = 'Remove';
			tempQuantities[`${productsArr[i].ID}`] = productsArr[i].quantity;
			tempSizes[`${productsArr[i].ID}`] = productsArr[i].size;
		}
		setProducts(temp);
		setRemoveText(tempText);
		setItemQuantities(tempQuantities);
		setItemSizes(tempSizes);
	}
	useEffect(() => {
		setTimeout(() => {
			setCanLoad(true);
		}, 1400);
	}, []);

	useEffect(() => {
		if (canSendInfo) {
			setTimeout(() => {
				history.push({
					pathname: '/checkout',
					state: {
						products: products,
					},
				});
			}, 1000);
		}
	}, [canSendInfo]);
	useEffect(() => {
		if (canLoad) {
			if (products.length === 0) {
				setCartMessage('Cart is Empty!');
			}
		}
	}, [products]);

	useEffect(() => {
		async function getData() {
			if (canLoad) {
				isAuthenticated ? await getOnlineData() : await getLocalData();
			}
		}
		getData();
	}, [canLoad]);

	async function removeFromCart(itemId, id, size) {
		if (isAuthenticated) {
			setRemoveText({
				...removeText,
				[`${id}`]: 'Removing...',
			});
			let response = await api.cart().removeItem(user.sub.split('|')[1], itemId);
			if (response.error) {
				setRemoveText({
					...removeText,
					[`${id}`]: 'Error removing Item.',
				});
				setTimeout(() => {
					setRemoveText({
						...removeText,
						[`${id}`]: 'Remove',
					});
				}, 1500);
			} else {
				setRemoveText({
					...removeText,
					[`${id}`]: 'Removed!',
				});
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			}
		} else {
			setRemoveText({
				...removeText,
				[`${id}`]: 'Removing...',
			});
			setTimeout(() => {
				db.deleteRows('cartItem', { itemId: itemId, size: size });
				db.commit();
			}, 1500);
			setTimeout(() => {
				setRemoveText({
					...removeText,
					[`${id}`]: 'Removed!',
				});
				window.location.reload();
			}, 1500);
		}
	}
	function handleChildComponentSizeChange(id, value) {
		setItemSizes({
			...itemSizes,
			[`${id}`]: value,
		});
	}
	function handleChildComponentQuantityChange(id, value) {
		setItemQuantities({
			...itemQuantities,
			[`${id}`]: value,
		});
	}
	function fillTable() {
		return products.map((item, index) => {
			if (index === products.length - 1) {
				return (
					<tr key={index} style={{ marginRight: '10vw' }}>
						<td>
							<CartItem
								item={item.data}
								image={baseUrl + item.data.fileName}
								title={item.data.title}
								size={item.size}
								quantity={item.quantity}
								id={item.uniqueId}
								changeSize={handleChildComponentSizeChange}
								changeQuantity={handleChildComponentQuantityChange}
							/>
						</td>
						<td>
							<input
								type='number'
								name='Quantity'
								id='quantity-input'
								value={
									itemQuantities === {}
										? item.quantity
										: itemQuantities[`${item.uniqueId}`]
								}
								onChange={e => {
									setItemQuantities({
										...itemQuantities,
										[`${item.uniqueId}`]: e.target.value,
									});
								}}
								min='1'
								step='1'
							/>
						</td>
						<td>
							<div id='price-section'>
								<p>
									<strong>RD${(item.price || item.data.price) * item.quantity}.00</strong>
								</p>
								<div id='delete-icon'>
									<FontAwesomeIcon
										id='delete'
										icon={faTrash}
										onClick={e => {
											e.preventDefault();
											removeFromCart(item.data._id, item.uniqueId, item.size);
										}}
									/>
									<span>{removeText === {} ? '' : removeText[`${item.uniqueId}`]}</span>
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
								item={item.data}
								image={baseUrl + item.data.fileName}
								title={item.data.title}
								size={item.size}
								quantity={item.quantity}
								id={item.uniqueId}
								changeSize={handleChildComponentSizeChange}
								changeQuantity={handleChildComponentQuantityChange}
							/>
						</td>
						<td>
							<input
								type='number'
								name='Quantity'
								id='quantity-input'
								value={
									itemQuantities === {}
										? item.quantity
										: itemQuantities[`${item.uniqueId}`]
								}
								onChange={e => {
									setItemQuantities({
										...itemQuantities,
										[`${item.uniqueId}`]: e.target.value,
									});
								}}
								min='1'
								step='1'
							/>
						</td>
						<td>
							<div id='price-section'>
								<p>
									<strong>RD${(item.price || item.data.price) * item.quantity}.00</strong>
								</p>
								<div id='delete-icon'>
									<FontAwesomeIcon
										id='delete'
										icon={faTrash}
										onClick={e => {
											e.preventDefault();
											removeFromCart(item.data._id, item.uniqueId, item.size);
										}}
									/>
									<span>{removeText === {} ? '' : removeText[`${item.uniqueId}`]}</span>
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
							id='cart-item'
							item={item.data}
							image={baseUrl + item.data.fileName}
							title={item.data.title}
							size={item.size}
							quantity={item.quantity}
							id={item.uniqueId}
							changeSize={handleChildComponentSizeChange}
							changeQuantity={handleChildComponentQuantityChange}
						/>
						<div id='price-section'>
							<p>
								<strong>RD${(item.price || item.data.price) * item.quantity}.00</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon
									id='delete'
									icon={faTrash}
									onClick={e => {
										e.preventDefault();
										removeFromCart(item.data._id, item.uniqueId, item.size);
									}}
								/>
								<span>{removeText === {} ? '' : removeText[`${item.uniqueId}`]}</span>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div key={index} className='body' id='cart-item-entry'>
						<CartItem
							item={item.data}
							image={baseUrl + item.data.fileName}
							title={item.data.title}
							size={item.size}
							quantity={item.quantity}
							id={item.uniqueId}
							changeSize={handleChildComponentSizeChange}
							changeQuantity={handleChildComponentQuantityChange}
						/>
						<div id='price-section'>
							<p>
								<strong>RD${(item.price || item.data.price) * item.quantity}.00</strong>
							</p>
							<div id='delete-icon'>
								<FontAwesomeIcon
									id='delete'
									icon={faTrash}
									onClick={e => {
										e.preventDefault();
										removeFromCart(item.data._id, item.uniqueId, item.size);
									}}
								/>
								<span>{removeText === {} ? '' : removeText[`${item.uniqueId}`]}</span>
							</div>
						</div>
					</div>
				);
			}
		});
	}

	function calculatePrice() {
		let items = products;
		let price = 0;

		if (products.length !== 0) {
			for (const item of items) {
				if (item.price) {
					price += Number(item.price) * Number(itemQuantities[`${item.uniqueId}`]);
				} else {
					price += Number(item.data.price) * Number(itemQuantities[`${item.uniqueId}`]);
				}
			}
		}
		return price;
	}

	async function handleCheckout() {
		setShow(true);
		setModalStatus({
			...modalStatus,
			loading: true,
		});
		let items = products;

		for (const item of items) {
			if (itemQuantities[`${item.uniqueId}`] !== item.quantity) {
				if (isAuthenticated) {
					let response = await api
						.cart()
						.updateItem(item.uniqueId, 'quantity', itemQuantities[`${item.uniqueId}`]);
					if (response.error) {
						setModalStatus({
							loading: false,
							error: true,
							success: false,
						});
						break;
					}
				} else {
					try {
						db.update('cartItem', { ID: item.uniqueId }, function (row) {
							row.quantity = itemQuantities[`${item.uniqueId}`];
							return row;
						});
						db.commit();
					} catch (error) {
						setModalStatus({
							loading: false,
							error: true,
							success: false,
						});
						break;
					}
				}
			}
			if (itemSizes[`${item.uniqueId}`] !== item.size) {
				if (isAuthenticated) {
					let response = await api
						.cart()
						.updateItem(item.uniqueId, 'size', itemSizes[`${item.uniqueId}`]);
					if (response.error) {
						setModalStatus({
							loading: false,
							error: true,
							success: false,
						});
						break;
					}
				} else {
					try {
						db.update('cartItem', { ID: item.uniqueId }, function (row) {
							row.size = itemSizes[`${item.uniqueId}`];
							return row;
						});
						db.commit();
					} catch (error) {
						setModalStatus({
							loading: false,
							error: true,
							success: false,
						});
						break;
					}
				}
			}
		}
		if (!modalStatus.error) {
			setModalStatus({
				loading: true,
				error: false,
				success: false,
			});
			isAuthenticated ? await getOnlineData() : await getLocalData();
			setCanSendInfo(true);
		}
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
			{products.length && (
				<>
					<p id='total-price'>Total: RD${calculatePrice()}.00</p>
					<button
						id='checkout-button'
						className='btn btn-info '
						onClick={e => {
							e.preventDefault();
							handleCheckout();
						}}>
						CHECKOUT
					</button>
				</>
			)}
			<Modal
				show={show}
				onHide={e => {
					setShow(false);
				}}
				backdrop='static'
				keyboard={false}>
				<Modal.Header closeButton>
					<strong>Proceding to Checkout</strong>
				</Modal.Header>
				<Modal.Body>
					{modalStatus.loading && (
						<>
							<Spinner style={{ marginLeft: '45%' }} animation='border' variant='primary' />
							<p style={{ textAlign: 'center' }}>Proceding to Checkout...</p>
						</>
					)}
					{modalStatus.error && (
						<>
							<FontAwesomeIcon
								style={{ marginLeft: '45%', color: 'red' }}
								size='3x'
								icon={faTimes}
							/>
							<p style={{ textAlign: 'center' }}>Error Processing Cart.</p>
						</>
					)}
					{modalStatus.success && (
						<>
							<FontAwesomeIcon
								style={{ marginLeft: '45%', color: 'green' }}
								size='3x'
								icon={faCheck}
							/>
							<p style={{ textAlign: 'center' }}>Cart Processed Succesfully!</p>
						</>
					)}
				</Modal.Body>
			</Modal>
			<Footer position='relative' bottom='0' />
		</div>
	);
};
export default Cart;
