import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../scss/CartItem.scss';

const CartItem = props => {
	const history = useHistory();
	const [sizeSelect, setSizeSelect] = useState(props.size);
	const [quantity, setQuantity] = useState(props.quantity);
	function redirect(title, link) {
		history.push({
			pathname: `/categories/Tops/${title}`,
			state: { image: link },
		});
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
				src={props.image}
				onClick={e => {
					e.preventDefault();
					redirect(props.title, props.image);
				}}
			/>

			<div id='item-meta'>
				<p id='title'>{props.title}</p>
				{props.likes || <p>Color: Orange</p>}
				<div id='quantity-section'>
					<p>Quantity:</p>
					<input
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

				{props.likes || (
					<div id='size-section'>
						<p>Size:</p>
						<select
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
