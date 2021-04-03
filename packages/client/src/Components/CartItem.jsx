import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../scss/CartItem.scss';

const CartItem = props => {
	const history = useHistory();
	const [sizeSelect, setSizeSelect] = useState(props.size);
	const [quantity, setQuantity] = useState(props.quantity);
	function redirect(title) {
		let tempItem = props.item;

		tempItem.fileName = props.image;
		if (title[0] !== 'P') {
			history.push({
				pathname: `/categories/Tops/${title}`,
				state: { item: tempItem },
			});
		}
	}

	function handleSizeChange(value) {
		props.changeSize(props.id, value);
	}

	function handleQuantityChange(value) {
		props.changeQuantity(props.id, value);
	}
	return (
		<div id='cart-item'>
			<img
				style={{ cursor: 'pointer' }}
				src={props.image}
				onClick={e => {
					e.preventDefault();
					redirect(props.title);
				}}
			/>

			<div id='item-meta'>
				<p id='title'>{props.title}</p>

				{props.likes || (
					<div id='quantity-section'>
						<p>Quantity:</p>
						<input
							className='form-control-sm'
							type='number'
							name='Quantity'
							id='quantity-input'
							value={quantity}
							onChange={e => {
								e.preventDefault();
								setQuantity(e.target.value);
								handleQuantityChange(e.target.value);
							}}
							min='1'
							step='1'
						/>
					</div>
				)}

				{props.likes || (
					<div id='size-section'>
						<p>Size:</p>
						<select
							className='form-control-sm'
							id='size-select'
							value={sizeSelect}
							onChange={e => {
								e.preventDefault();
								setSizeSelect(e.target.value);
								handleSizeChange(e.target.value);
							}}>
							<option value='S'>S</option>
							<option value='M'>M</option>
							<option value='L'>L</option>
						</select>
					</div>
				)}
			</div>
		</div>
	);
};
export default CartItem;
