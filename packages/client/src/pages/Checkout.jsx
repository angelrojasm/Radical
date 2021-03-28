import React, { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import { TopNav, Footer, OrderRecap, ModalPopup } from '../Components/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faMoneyBill, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../api/api';
import db from '../localdb';
import '../scss/Checkout.scss';

const Checkout = props => {
	const { user, isAuthenticated } = useAuth0();
	const [modalStatus, setModalStatus] = useState({
		show: false,
		loading: false,
		error: false,
		success: false,
	});
	const [billingInfo, setBillingInfo] = useState({
		name: '',
		email: '',
		phone: '',
		street: '',
		sector: '',
		city: '',
		residency: '',
	});
	const [errorFlags, setErrorFlags] = useState({
		name: false,
		email: false,
		phone: false,
		street: false,
		city: false,
		sector: false,
		residency: false,
		image: false,
	});
	const [paymentOption, setPaymentOption] = useState('paypal');
	const [shippingOption, setShippingOption] = useState('delivery');
	const [shippingCost, setShippingCost] = useState(0);
	const [file, setFile] = useState(null);
	const [products, setProducts] = useState([]);
	const [canLoad, setCanLoad] = useState(false);

	useEffect(() => {
		if (props.location.state !== undefined) {
			setProducts(props.location.state.products);
		}
		setTimeout(() => {
			setCanLoad(true);
		}, 1400);
	}, []);

	useEffect(() => {
		async function getUserdata() {
			let userId = user.sub.split('|')[1];
			let obj = await api.user().get(userId);
			setBillingInfo({
				name: `${obj.content.firstName} ${obj.content.lastName}`,
				email: obj.content.email,
				phone: obj.content.phone,
				street: obj.content.street,
				sector: obj.content.sector,
				city: obj.content.city,
				residency: obj.content.residency,
			});
		}
		async function getOnlineData() {
			let productsArr = await api.cart().getItems(user.sub.split('|')[1]);
			let temp = [];
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
			}
			setProducts(temp);
		}
		async function getLocalData() {
			let productsArr = db.queryAll('cartItem');
			let temp = [];

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
			}
			setProducts(temp);
		}

		async function getData() {
			if (canLoad) {
				if (isAuthenticated) {
					await getUserdata();
					if (props.location.state === undefined) {
						await getOnlineData();
					}
				} else {
					if (props.location.state === undefined) {
						await getLocalData();
					}
				}
			}
		}

		getData();
	}, [canLoad]);

	useEffect(() => {
		shippingOption === 'delivery' ? setShippingCost(200) : setShippingCost(0);
	}, [shippingOption]);

	function validateInput() {
		let error = false;
		let phone = billingInfo.phone.replace(/-/g, '');
		for (const [key] of Object.entries(billingInfo)) {
			if (billingInfo[key] === '') {
				error = true;
				setErrorFlags({
					[key]: true,
				});
			}
			if (error) {
				break;
			}
		}
		if (!error) {
			if (!file && paymentOption === 'transfer') {
				setErrorFlags({
					image: true,
				});
				error = true;
			} else if (
				!billingInfo.email.match(
					/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
				)
			) {
				setErrorFlags({
					emailNotValid: true,
				});
				error = true;
			} else if (!phone.match(/^(809|829|849)[0-9]{7}$/)) {
				setErrorFlags({
					phoneNotValid: true,
				});
				error = true;
			} else {
				setErrorFlags({});
			}
		}
		return error;
	}

	function calculateTotal() {
		let items = products;
		let price = 0;

		if (products.length !== 0) {
			for (const item of items) {
				if (item.price) {
					price += Number(item.price) * Number(item.quantity);
				} else {
					price += Number(item.data.price) * Number(item.quantity);
				}
			}
		}
		return price + shippingCost;
	}
	async function handleOrderPlacement() {
		let error = validateInput();

		if (!error) {
			setModalStatus({
				show: true,
				loading: true,
			});
			let total = calculateTotal();
			let formData = new FormData();
			if (isAuthenticated) {
				formData.append('userId', user.sub.split('|')[1]);
				formData.append('billingInfo', JSON.stringify(billingInfo));
				formData.append('products', JSON.stringify(products));
				formData.append('shippingMethod', shippingOption);
				formData.append('paymentMethod', paymentOption);
				formData.append('total', total);
				formData.append('image', file);
			} else {
				formData.append('billingInfo', JSON.stringify(billingInfo));
				formData.append('products', JSON.stringify(products));
				formData.append('shippingMethod', shippingOption);
				formData.append('paymentMethod', paymentOption);
				formData.append('total', total);
				formData.append('image', file);
			}
			let response = await api.order().create(formData);
			if (response.error) {
				setModalStatus({ show: true, error: true });
			} else {
				if (isAuthenticated) {
					await api.cart().clear(user.sub.split('|')[1]);
					for (let i = 0; i < products.length; i++) {
						if (products[i].designImage) {
							let fileName = products[i].designImage.slice(37);
							await api.item().deleteDesign(fileName);
						}
					}
					setModalStatus({ show: true, success: true });
				} else {
					db.deleteRows('cartItem');
					db.commit();
					for (let i = 0; i < products.length; i++) {
						if (products[i].designImage) {
							let fileName = products[i].designImage.slice(37);
							await api.item().deleteDesign(fileName);
						}
					}
					setModalStatus({ show: true, success: true });
				}
			}
		}
	}

	function getOrderInfo() {
		let total = calculateTotal();
		let orderInfo;
		if (isAuthenticated) {
			orderInfo = {
				userId: user.sub.split('|')[1],
				billingInfo: JSON.stringify(billingInfo),
				products: JSON.stringify(products),
				shippingMethod: shippingOption,
				paymentMethod: paymentOption,
				total: total,
			};
		} else {
			orderInfo = {
				billingInfo: JSON.stringify(billingInfo),
				products: JSON.stringify(products),
				shippingMethod: shippingOption,
				paymentMethod: paymentOption,
				total: total,
			};
		}

		return orderInfo;
	}
	function updateModal(newStatus) {
		if (newStatus === 'loading') {
			setModalStatus({ show: true, loading: true });
		} else if (newStatus === 'error') {
			setModalStatus({ show: true, error: true });
		} else if (newStatus === 'success') {
			setModalStatus({ show: true, success: true });
		}
	}

	return (
		<div id='checkout'>
			<TopNav isBordered={true} />
			<div id='main-container'>
				<div id='checkout-info'>
					<div className='section'>
						<p className='section-title'>Billing Information</p>
						<div className='attribute'>
							<p className='attribute-title'>
								Name{' '}
								{errorFlags.name && (
									<span className='input-error'>* Please fill out your name.</span>
								)}
							</p>
							<input
								type='text'
								className='input'
								value={billingInfo.name}
								name='name'
								onChange={e => {
									setBillingInfo({
										...billingInfo,
										[e.target.name]: e.target.value,
									});
								}}
							/>
						</div>

						<div className='attribute'>
							<p className='attribute-title'>
								Email{' '}
								{errorFlags.email && (
									<span className='input-error'>* Please fill out your email.</span>
								)}
								{errorFlags.emailNotValid && (
									<span className='input-error'>
										* Please enter a valid email address.
									</span>
								)}
							</p>
							<input
								type='email'
								className='input'
								value={billingInfo.email}
								name='email'
								onChange={e => {
									setBillingInfo({
										...billingInfo,
										[e.target.name]: e.target.value,
									});
								}}
							/>
						</div>
						<div id='phone-info'>
							<div className='attribute'>
								<p className='attribute-title'>
									Phone (DO){' '}
									{errorFlags.phone && (
										<span className='input-error'>
											* Please fill out your phone number.
										</span>
									)}
									{errorFlags.phoneNotValid && (
										<span className='input-error'>
											* Please enter a valid phone number.
										</span>
									)}
								</p>
								<input
									type='text'
									className='input'
									value={billingInfo.phone}
									name='phone'
									onChange={e => {
										setBillingInfo({
											...billingInfo,
											[e.target.name]: e.target.value,
										});
									}}
								/>
							</div>
						</div>
						<div className='attribute'>
							<p className='attribute-title'>
								Address{' '}
								{errorFlags.street && (
									<span className='input-error'>* Please fill out your address.</span>
								)}
							</p>
							<input
								type='text'
								className='input'
								value={billingInfo.street}
								name='street'
								onChange={e => {
									setBillingInfo({
										...billingInfo,
										[e.target.name]: e.target.value,
									});
								}}
							/>
						</div>
						<div id='city-info'>
							<div className='attribute'>
								<p className='attribute-title'>
									City{' '}
									{errorFlags.city && (
										<span className='input-error'>* Please fill out your city.</span>
									)}
								</p>
								<input
									type='text'
									className='input'
									value={billingInfo.city}
									name='city'
									onChange={e => {
										setBillingInfo({
											...billingInfo,
											[e.target.name]: e.target.value,
										});
									}}
								/>
							</div>
							<div className='attribute'>
								<p className='attribute-title'>
									Sector{' '}
									{errorFlags.sector && (
										<span className='input-error'>* Please fill out your sector.</span>
									)}
								</p>
								<input
									type='text'
									className='input'
									value={billingInfo.sector}
									name='sector'
									onChange={e => {
										setBillingInfo({
											...billingInfo,
											[e.target.name]: e.target.value,
										});
									}}
								/>
							</div>
						</div>
						<div className='attribute'>
							<p className='attribute-title'>
								Residency{' '}
								{errorFlags.residency && (
									<span className='input-error'>
										* Please fill out your place of residency.
									</span>
								)}
							</p>
							<input
								type='text'
								className='input'
								value={billingInfo.residency}
								name='residency'
								onChange={e => {
									setBillingInfo({
										...billingInfo,
										[e.target.name]: e.target.value,
									});
								}}
							/>
						</div>
					</div>
					<div className='section'>
						<p className='section-title' id='payment-title'>
							Payment Information
						</p>

						<div className='radio-option'>
							<input
								type='radio'
								defaultChecked
								className='radio-input'
								value='paypal'
								name='payment-option'
								id='paypal'
								onChange={e => {
									setPaymentOption(e.target.value);
								}}
							/>
							<label htmlFor='paypal'>Paypal</label>
							<FontAwesomeIcon className='icon' icon={faPaypal} />
						</div>
						<div className='radio-option'>
							<input
								type='radio'
								value='transfer'
								name='payment-option'
								id='transfer'
								className='radio-input'
								onChange={e => {
									setPaymentOption(e.target.value);
								}}
							/>
							<label htmlFor='transfer'>Transfer</label>
							<FontAwesomeIcon className='icon' icon={faMoneyBill} />
						</div>
						{paymentOption === 'transfer' && (
							<div>
								<div className='attribute'>
									<p className='attribute-title'>
										Transfer Receipt:{' '}
										{errorFlags.image && (
											<span className='input-error'>
												* Please Attach the payment receipt
											</span>
										)}
									</p>
									<input
										type='file'
										accept='image/*'
										onChange={e => {
											setFile(e.target.files[0]);
										}}
									/>
								</div>
								<p id='transfer-bank-info'>
									** Radical only accepts bank transfers made to: <br />
									Bank X <br />
									Account Number #1111111 <br />
									Titular Name: John Smith
								</p>
							</div>
						)}
					</div>
					<div className='section'>
						<p className='section-title'>Shipping Information</p>
						<div className='radio-option'>
							<input
								type='radio'
								defaultChecked
								className='radio-input'
								value='delivery'
								name='shipping-option'
								id='delivery'
								onChange={e => {
									setShippingOption(e.target.value);
								}}
							/>
							<label htmlFor='paypal'>Delivery(RD$200.00)</label>
						</div>
						<div className='radio-option'>
							<input
								type='radio'
								value='pickup'
								className='radio-input'
								name='shipping-option'
								id='pickup'
								onChange={e => {
									setShippingOption(e.target.value);
								}}
							/>
							<label htmlFor='transfer'>Pick Up (RD$0.00)</label>
						</div>
					</div>
					{paymentOption === 'transfer' && (
						<div id='transfer-modal'>
							<Button
								style={{
									backgroundColor: '#22dd77',
									width: '100%',
									border: 'none',
									fontSize: '1.15em',
								}}
								onClick={e => {
									handleOrderPlacement();
								}}>
								Place Order
							</Button>
							<Modal
								show={modalStatus.show}
								onHide={e => {
									if (modalStatus.error || modalStatus.loading) {
										setModalStatus({
											...modalStatus,
											show: false,
										});
									} else if (modalStatus.success) {
										window.location = window.location.origin;
									}
								}}
								backdrop='static'
								keyboard={false}>
								<Modal.Header closeButton>
									<strong>Payment Section</strong>
								</Modal.Header>
								<Modal.Body>
									{modalStatus.loading && (
										<>
											<Spinner
												style={{ marginLeft: '45%' }}
												animation='border'
												variant='primary'
											/>
											<p style={{ textAlign: 'center' }}>Placing Order...</p>
										</>
									)}
									{modalStatus.error && (
										<>
											<FontAwesomeIcon
												style={{ marginLeft: '45%', color: 'red' }}
												size='3x'
												icon={faTimes}
											/>
											<p style={{ textAlign: 'center' }}>Error Placing Order.</p>
										</>
									)}
									{modalStatus.success && (
										<>
											<FontAwesomeIcon
												style={{ marginLeft: '45%', color: 'green' }}
												size='3x'
												icon={faCheck}
											/>
											<p style={{ textAlign: 'center' }}>
												Order has been placed Succesfully! <br />
												We will verify your transfer receipt and contact you shortly!
											</p>
										</>
									)}
								</Modal.Body>
							</Modal>
						</div>
					)}

					{paymentOption === 'paypal' && (
						<>
							<ModalPopup
								shippingCost={shippingCost}
								validateInput={validateInput}
								getOrderInfo={getOrderInfo}
								productsProp={products}
								updateModal={updateModal}
								calculateTotal={calculateTotal}
							/>
							<Modal
								show={modalStatus.show}
								onHide={e => {
									if (modalStatus.error || modalStatus.loading) {
										setModalStatus({
											...modalStatus,
											show: false,
										});
									} else if (modalStatus.success) {
										window.location = window.location.origin;
									}
								}}
								backdrop='static'
								keyboard={false}>
								<Modal.Header closeButton>
									<strong>Payment Section</strong>
								</Modal.Header>
								<Modal.Body>
									{modalStatus.loading && (
										<>
											<Spinner
												style={{ marginLeft: '45%' }}
												animation='border'
												variant='primary'
											/>
											<p style={{ textAlign: 'center' }}>Placing Order...</p>
										</>
									)}
									{modalStatus.error && (
										<>
											<FontAwesomeIcon
												style={{ marginLeft: '45%', color: 'red' }}
												size='3x'
												icon={faTimes}
											/>
											<p style={{ textAlign: 'center' }}>Error Placing Order.</p>
										</>
									)}
									{modalStatus.success && (
										<>
											<FontAwesomeIcon
												style={{ marginLeft: '45%', color: 'green' }}
												size='3x'
												icon={faCheck}
											/>
											<p style={{ textAlign: 'center' }}>
												Order has been placed Succesfully! <br />
												We will verify your transfer receipt and contact you shortly!
											</p>
										</>
									)}
								</Modal.Body>
							</Modal>
						</>
					)}
				</div>
				<OrderRecap shippingCost={shippingCost} productsProp={products} />
			</div>
			<Footer />
		</div>
	);
};
export default Checkout;
