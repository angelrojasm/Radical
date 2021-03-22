import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../api/api';
import { TopNav, Footer } from '../Components/index';
import '../scss/AdminPanel.scss';

const AdminPanel = props => {
	const { user, isAuthenticated } = useAuth0();
	const [canLoad, setCanLoad] = useState(false);
	const [isAdmin, setIsAdmin] = useState(true);
	const [item, setItem] = useState({
		title: '',
		category: 'tops',
		price: 100,
	});
	const [errorFlags, setErrorFlags] = useState({
		title: false,
		price: false,
	});
	const [itemImage, setItemImage] = useState();

	function handleInputChange(e) {
		e.preventDefault();
		setItem({
			...item,
			[e.target.name]: e.target.value,
		});
	}

	function validateInput() {
		let error = false;
		if (!itemImage) {
			setErrorFlags({
				itemImage: true,
			});
			error = true;
		} else {
			for (const [key] of Object.entries(item)) {
				if (item[key] === '') {
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
				if (item.price === 0) {
					setErrorFlags({
						price: true,
					});
					error = true;
				} else {
					setErrorFlags({});
				}
			}
		}
		return error;
	}

	async function createItem() {
		let error = validateInput();
		if (!error) {
			let formData = new FormData();
			formData.append('fileName', itemImage.name);
			formData.append('image', itemImage);
			formData.append('title', item.title);
			formData.append('price', item.price);
			formData.append('category', item.category);
			let data = await api.item().create(formData);
			if (!error) {
				alert('added Succesfully');
				setItem({ title: '', category: 'tops', price: 100 });
				setItemImage();
			}
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setCanLoad(true);
		}, 1400);
	}, []);

	useEffect(() => {
		async function getData() {
			if (isAuthenticated) {
				let response = await api.admin().isAdmin(user.email);
				if (response.isAdmin) {
					setIsAdmin(true);
				} else {
					window.location = window.origin.location;
				}
			} else {
				window.location = window.location.origin;
			}
		}
		/*if (canLoad) {
			getData();
		}*/
	}, [canLoad]);

	return isAdmin ? (
		<div id='admin-panel'>
			<TopNav isBordered={true} />
			<div id='admin-panel-container'>
				<h2 id='panel-title'>Admin Panel</h2>
				<div id='add-item-section'>
					<h3>Add an Item</h3>
					<div className='section'>
						<label htmlFor='title'>
							Item Image{' '}
							{errorFlags.itemImage && (
								<span className='input-error'>* Please select the item image file.</span>
							)}
						</label>
						<input
							type='file'
							accept='image/*'
							name='image'
							id='image'
							onChange={e => {
								setItemImage(e.target.files[0]);
							}}
						/>
					</div>
					<div className='section'>
						<label htmlFor='title'>
							Item Name:{' '}
							{errorFlags.title && (
								<span className='input-error'>* Please fill out the item name.</span>
							)}
						</label>
						<input
							type='text'
							name='title'
							id='title'
							value={item.title}
							onChange={e => {
								handleInputChange(e);
							}}
						/>
					</div>
					<div className='section'>
						<label htmlFor='category'>
							Category:{' '}
							{errorFlags.category && (
								<span className='input-error'>* Please fill out the item category.</span>
							)}
						</label>
						<select
							id='category'
							name='category'
							onChange={e => {
								handleInputChange(e);
							}}>
							<option value='tops'>Tops</option>
							<option value='caps'>Caps</option>
							<option value='jean jackets'>Jean Jackets</option>
						</select>
					</div>
					<div className='section'>
						<label htmlFor='price'>
							Price:{' '}
							{errorFlags.price && (
								<span className='input-error'>* Please choose a price for the item.</span>
							)}
						</label>
						<input
							type='number'
							name='price'
							id='price'
							min='100'
							step='50'
							max='5000'
							value={item.price}
							onChange={e => {
								handleInputChange(e);
							}}
						/>
					</div>
					<button
						className='btn btn-primary'
						onClick={e => {
							e.preventDefault();
							createItem();
						}}>
						Add Item
					</button>
				</div>
			</div>
			<Footer position='fixed' bottom='1vh' />
		</div>
	) : (
		<></>
	);
};
export default AdminPanel;
