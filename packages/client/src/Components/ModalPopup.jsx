import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PayPalButtons from './PayPalButtons';
import OrderRecap from './OrderRecap';
import api from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';
import db from '../localdb';

const ModalPopup = ({
	shippingCost,
	validateInput,
	getOrderInfo,
	productsProp,
	updateModal,
	calculateTotal,
}) => {
	const [show, setShow] = useState(false);
	const [total, setTotal] = useState(0);
	const { user, isAuthenticated } = useAuth0();

	useEffect(() => {
		console.log(total);
	}, [total]);
	function handleOrderPlacement() {
		let error = validateInput();
		if (!error) {
			setShow(true);
			setTotal(`${Math.floor(calculateTotal() / 60)}`);
		}
	}
	async function onApprove() {
		setShow(false);
		updateModal('loading');
		let orderInfo = getOrderInfo();
		console.log(orderInfo);
		let response = await api.order().create(orderInfo);
		if (response.error) {
			updateModal('error');
		} else {
			if (isAuthenticated) {
				await api.cart().clear(user.sub.split('|')[1]);
				updateModal('success');
			} else {
				db.deleteRows('cartItem');
				db.commit();
				updateModal('success');
			}
		}
	}
	return (
		<>
			<Button
				style={{
					backgroundColor: '#22dd77',
					width: '100%',
					border: 'none',
					fontSize: '1.15em',
				}}
				onClick={e => {
					e.preventDefault();
					handleOrderPlacement();
				}}>
				Place Order
			</Button>

			{show && (
				<Modal
					show={show}
					onHide={() => {
						setShow(false);
					}}
					backdrop='static'
					keyboard={false}
					centered>
					<Modal.Header closeButton>
						<strong>Payment Section</strong>
					</Modal.Header>
					<Modal.Body>
						<OrderRecap
							shippingCost={shippingCost}
							isPopup={true}
							productsProp={productsProp}
						/>
					</Modal.Body>
					<p style={{ fontSize: '0.7em', color: 'red', textAlign: 'center' }}>
						* Payments made through paypal will be charged in USD. <br />* Paypal orders are
						valued at 60.0 $DOP = 1.0 $USD
					</p>
					<Modal.Footer>
						<div style={{ width: '80%', margin: '0 auto' }}>
							<PayPalButtons orderAmount={1} onApprove={onApprove} />
						</div>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
};
export default ModalPopup;
