import React, { useState, useEffect } from 'react';
import './withAlert.css';

const withAlert = Component => {
	return props => {
		const DEFAULT_ALERT_TYPE = 'danger';
		const DEFAULT_ALERT = {
			show: false,
			text: '',
			type: '',
		};
		const [alert, setAlert] = useState(DEFAULT_ALERT);
		const [isActive, setIsActive] = useState(true);

		useEffect(() => {
			let x = !isActive;
			setIsActive(x);
		}, [alert]);
		function hideAlert() {}
		return (
			<>
				<div
					className={`m-0 absolute-alert alert alert-${alert.type || DEFAULT_ALERT_TYPE} `}
					role='alert'>
					{alert.text}
					<button type='button' className='close' data-dismiss='alert' onClick={hideAlert}>
						<span>&times;</span>
					</button>
				</div>
				<Component showAlert={setAlert} {...props} />
			</>
		);
	};
};

export default withAlert;
