import React, { useState, useEffect } from 'react';
import '../scss/CustomItemForm.scss';
import api from '../api/api';
import db from '../localdb';
import { Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from '@auth0/auth0-react';
const CustomItemForm = ({ itemType }) => {
	const { user, isAuthenticated } = useAuth0();
	const [itemInfo, SetItemInfo] = useState({
		type: itemType,
		size: 'S',
		qty: 1,
		color: 'White',
		designType: 'Graphic',
		designImage: null,
		comments: '',
		price: 0,
	});
	const [modalStatus, setModalStatus] = useState({});

	function handleInputChange(e) {
		SetItemInfo({
			...itemInfo,
			[e.target.name]: e.target.value,
		});
	}

	function calculatePrice() {
		let price = 0;
		let type = itemInfo.type;
		let designPrice = itemInfo.designType === 'Graphic' ? 550 : 800;
		switch (type) {
			case 'cap':
				price = 550 + designPrice;
				break;
			case 'jean-jacket':
				price = 2950 + designPrice;
				break;
			case 'shirt':
				price = 300 + designPrice;
				break;
			case 'hoodie':
				price = 650 + designPrice;
				break;
		}
		return price;
	}
	function getItemId() {
		let itemId;
		let type = itemInfo.type;
		switch (type) {
			case 'cap':
				itemId = '605f9785126573cce280d00e';
				break;
			case 'jean-jacket':
				itemId = '605f9866126573cce280d00f';
				break;
			case 'shirt':
				itemId = '605f9890126573cce280d010';
				break;
			case 'hoodie':
				itemId = '605f98aa126573cce280d011';
				break;
		}
		return itemId;
	}

	async function addToCart() {
		let designImageFileName;
		setModalStatus({
			show: true,
			loading: true,
		});

		if (itemInfo.designImage) {
			designImageFileName = process.env.REACT_APP_DESIGN_URL + itemInfo.designImage.name;
			let form = new FormData();
			form.append('image', itemInfo.designImage);
			let uploaded = await api.item().addDesign(form);
			if (uploaded.error) {
				setModalStatus({
					show: true,
					error: true,
				});
			}
		}
		if (isAuthenticated) {
			let form = new FormData();
			form.append('userId', user.sub.split('|')[1]);
			form.append('itemId', getItemId());
			form.append('quantity', itemInfo.qty);
			form.append('size', itemInfo.size);
			form.append('color', itemInfo.color);
			form.append('designType', itemInfo.designType);
			form.append('price', calculatePrice());
			form.append('comments', itemInfo.comments);
			if (itemInfo.designImage) {
				form.append('designImage', designImageFileName);
			}

			let response = await api.cart().addItem(form);
			if (response.error) {
				setModalStatus({
					show: true,
					error: true,
				});
			} else {
				setModalStatus({
					show: true,
					success: true,
				});
			}
		} else {
			let records = db.queryAll('cartItem', {
				query: { itemId: getItemId(), size: itemInfo.size },
			});
			if (records.length > 0) {
				db.update('cartItem', { itemId: getItemId(), size: itemInfo.size }, function (row) {
					row.quantity += 1;

					return row;
				});
				db.commit();
			} else {
				if (itemInfo.designImage) {
					db.insert('cartItem', {
						itemId: getItemId(),
						quantity: itemInfo.qty,
						size: itemInfo.size,
						color: itemInfo.color,
						designType: itemInfo.designType,
						price: calculatePrice(),
						comments: itemInfo.comments,
						designImage: designImageFileName,
					});
					db.commit();
				} else {
					db.insert('cartItem', {
						itemId: getItemId(),
						quantity: itemInfo.qty,
						size: itemInfo.size,
						color: itemInfo.color,
						designType: itemInfo.designType,
						price: calculatePrice(),
						comments: itemInfo.comments,
					});
					db.commit();
				}

				setModalStatus({
					show: true,
					success: true,
				});
			}
		}
	}
	return (
		<div id='custom-form'>
			<p className='card-header text-center font-weight-bold'>Customize your Item!</p>
			<div className='section'>
				<form
					onSubmit={e => {
						e.preventDefault();
						addToCart();
					}}>
					<div className='attribute form-group'>
						<label htmlFor='size-select' className='attribute-title'>
							Size:
						</label>
						<select
							className=' form-control-sm'
							id='size-select'
							name='size'
							value={itemInfo.size}
							onChange={e => {
								e.preventDefault();
								handleInputChange(e);
							}}>
							<option value='S'>S</option>
							<option value='M'>M</option>
							<option value='L'>L</option>
						</select>
					</div>
					<div className='attribute form-group'>
						<label htmlFor='qty-select' className='attribute-title'>
							Qty:
						</label>
						<input
							type='number'
							name='qty'
							id='qty-select'
							min='1'
							max='10'
							step='1'
							value={itemInfo.qty}
							onChange={e => {
								e.preventDefault();
								handleInputChange(e);
							}}
							className='form-control-sm'
						/>
					</div>
					<div className='attribute form-group'>
						<label htmlFor='color-select' className='attribute-title'>
							Color:
						</label>
						<select
							id='color-select'
							className='form-control form-control-sm'
							name='color'
							value={itemInfo.color}
							onChange={e => {
								e.preventDefault();
								handleInputChange(e);
							}}>
							<option value='White'>White</option>
							<option value='Gray'>Gray</option>
							<option value='Black'>Black</option>
						</select>
					</div>
					<div className='attribute form-group'>
						<label htmlFor='type-select' className='attribute-title'>
							Custom Design Type:
						</label>
						<select
							id='type-select'
							className='form-control form-control-sm'
							name='designType'
							value={itemInfo.designType}
							onChange={e => {
								e.preventDefault();
								handleInputChange(e);
							}}>
							<option value='Graphic'>Graphic</option>
							<option value='Embroidered'>Embroidered</option>
						</select>
					</div>
					<div clasName='form-group'>
						<label htmlFor='exampleFormControlFile1'>Design Image Example:</label>
						<input
							type='file'
							name='designImage'
							className='form-control-file'
							id='exampleFormControlFile1'
							onChange={e => {
								e.preventDefault();
								SetItemInfo({
									...itemInfo,
									[e.target.name]: e.target.files[0],
								});
							}}
						/>
					</div>
					<div className='form-group comment-section'>
						<label htmlFor='exampleFormControlTextarea1'>Tell us your vision! </label>
						<textarea
							required
							className='form-control'
							id='exampleFormControlTextarea1'
							rows='3'
							name='comments'
							value={itemInfo.comments}
							onChange={e => {
								e.preventDefault();
								handleInputChange(e);
							}}></textarea>
					</div>
					<button type='submit' className='btn btn-primary'>
						{' '}
						Add to Cart
					</button>
				</form>
				<Modal
					show={modalStatus.show}
					onHide={e => {
						if (modalStatus.success) {
							window.location.reload();
						}
						setModalStatus({ show: false });
					}}
					backdrop='static'
					keyboard={false}>
					<Modal.Header closeButton>
						<strong>Adding to Cart</strong>
					</Modal.Header>
					<Modal.Body>
						{modalStatus.loading && (
							<>
								<Spinner
									style={{ marginLeft: '45%' }}
									animation='border'
									variant='primary'
								/>
								<p style={{ textAlign: 'center' }}>Adding to Cart...</p>
							</>
						)}
						{modalStatus.error && (
							<>
								<FontAwesomeIcon
									style={{ marginLeft: '45%', color: 'red' }}
									size='3x'
									icon={faTimes}
								/>
								<p style={{ textAlign: 'center' }}>Error Adding to Cart.</p>
							</>
						)}
						{modalStatus.success && (
							<>
								<FontAwesomeIcon
									style={{ marginLeft: '45%', color: 'green' }}
									size='3x'
									icon={faCheck}
								/>
								<p style={{ textAlign: 'center' }}>Added to Cart!</p>
							</>
						)}
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
};
export default CustomItemForm;
