import React, { useState, useEffect } from 'react';
import TopNav from '../Components/TopNav'
import Footer from '../Components/Footer'
import InfoPanel from '../Components/InfoPanel'
import ShippingInfoPanel from '../Components/ShippingInfoPanel'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock, faShippingFast} from '@fortawesome/free-solid-svg-icons'
import '../css/UserProfile.css'

const UserProfile = props => {
	const [showPersonalInfo, setShowPersonalInfo] = useState(false)

	function togglePanels() {
		let x = !showPersonalInfo
		setShowPersonalInfo(x)
	}

	return (
		<div id='user-profile'>
			<TopNav isBordered={true} />
			<div id="main-panels">
				<div id="options-panel">
					<div id="user-meta">
						<p id="user-logo">J</p>
						<p id="meta-title">Jose's Account</p>
						<p id="meta-sub">Thanks for choosing Radical, Jose!</p>
					</div>
					<hr style={{width: '80%'}}/>
					<div id="option-categories">
						<div id="info-security" onClick={(e) => {
							e.preventDefault();
							togglePanels();
						}} className={showPersonalInfo && "selected-option"}>
							<FontAwesomeIcon className="icon" icon={faLock} />
							<p>Personal Information</p>
						</div>
						<div id="shipping-info" onClick={(e) => {
							e.preventDefault();
							togglePanels();
						}} className={showPersonalInfo || "selected-option"}>
						<FontAwesomeIcon className="icon" icon={faShippingFast} />
							<p>Shipping Address</p>
						</div>
					</div>
				</div>
				<div id="info-panel">
	{showPersonalInfo? <InfoPanel />: <ShippingInfoPanel /> }
				</div>		
			</div>
			<Footer position="relative" bottom="1vh" />
		</div>
	);
};
export default UserProfile;
