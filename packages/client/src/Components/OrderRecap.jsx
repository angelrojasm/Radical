import React, { useState, useEffect } from 'react';
import '../scss/OrderRecap.scss';

const OrderRecap = ({ shippingCost = 0, isPopup = false, productsProp = [] }) => {
	const [products, setProducts] = useState(productsProp);

	useEffect(() => {
		setProducts(productsProp);
	}, [productsProp]);
	function renderOrderItems() {
		return products.map((item, index) => {
			if (index === products.length - 1) {
				return (
					<div key={index}>
						<div className='item-div'>
							<div className='item-meta'>
								<p className='item-title'>
									{item.quantity} x {item.data.title}
								</p>
								<p className='item-desc'>Size: {item.size}</p>
							</div>
							<p>RD${item.data.price}.00</p>
						</div>
						<hr style={{ width: '100%' }} />
					</div>
				);
			} else {
				return (
					<div key={index}>
						<div className='item-div'>
							<div className='item-meta'>
								<p className='item-title'>
									{item.quantity} x {item.data.title}
								</p>
								<p className='item-desc'>Size: {item.size}</p>
							</div>
							<p>RD${item.data.price}.00</p>
						</div>
						<hr />
					</div>
				);
			}
		});
	}
	function calculateTotal() {
		let items = products;
		let price = 0;

		if (products.length !== 0) {
			for (const item of items) {
				price += Number(item.data.price) * Number(item.quantity);
			}
		}
		return price;
	}
	return (
		<div id='order-info' style={isPopup ? { margin: '1% auto 2% auto', width: '90%' } : {}}>
			<p className='section-title'>Order Summary</p>
			{renderOrderItems()}
			<div id='total-price-div'>
				<p id='order-total'>
					Sub Total: <strong>RD${calculateTotal()}</strong>
				</p>
				<p id='shipping-cost'>
					Shipping: <strong>RD${shippingCost}.00</strong>
				</p>
				<hr />
				<p id='total-price'>
					Total: <strong>RD${calculateTotal() + shippingCost}.00</strong>
				</p>
			</div>
		</div>
	);
};
export default OrderRecap;
