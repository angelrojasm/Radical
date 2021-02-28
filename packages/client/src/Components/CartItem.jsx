import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../scss/CartItem.scss';

const CartItem = props => {
	const history = useHistory();
	const [sizeSelect, setSizeSelect] = useState(props.size);
	function redirect(title, link) {
		history.push({
			pathname: `/categories/Tops/${title}`,
			state: { image: link },
		});
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
				<p className='show-mobile'>Quantity: {props.quantity} </p>
				{props.likes || (
					<div id='size-section'>
						<p>Size :</p>
						<select
							id='size-select'
							value={sizeSelect}
							onChange={e => {
								setSizeSelect(e.target.value);
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
