import React, { useState, useEffect } from 'react';
import '../scss/CustomItemForm.scss';
import api from '../api/api';
import db from '../localdb';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';
const CustomItemForm = ({ itemType }) => {
	const [itemInfo, SetItemInfo] = useState({
		type: itemType,
		size: 'S',
		qty: 1,
		color: 'White',
		designType: 'Graphic',
		image: {},
		comments: '',
		price: 0,
	});
	const [errorFlags, setErrorFlags] = useState();
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
			case 'sweater':
				price = 650 + designPrice;
				break;
		}
		return price;
	}

	async function addToCart() {}
	return (
		<div id='custom-form'>
			<p className='card-header text-center font-weight-bold'>Customize your Item!</p>
			<div className='section'>
				<form
					onSubmit={e => {
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
							name='image'
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
							rows='3'></textarea>
					</div>
					<button type='submit' className='btn btn-primary'>
						{' '}
						Add to Cart
					</button>
				</form>
			</div>
		</div>
	);
};
export default CustomItemForm;
