import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../scss/CartItem.scss';

const CartItem = props => {
	const history = useHistory();

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
				{props.likes || <p>Size: {props.size}</p>}
			</div>
		</div>
	);
};
export default CartItem;
