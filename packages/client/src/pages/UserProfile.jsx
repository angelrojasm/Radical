import React, { useState, useEffect } from 'react';
import TopNav from '../Components/TopNav'
import Footer from '../Components/Footer'
import InfoPanel from '../Components/InfoPanel'
import ShippingInfoPanel from '../Components/ShippingInfoPanel'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock, faShippingFast} from '@fortawesome/free-solid-svg-icons'
import { withAuthenticationRequired } from '@auth0/auth0-react';
import {useAuth0} from '@auth0/auth0-react'
import api from '../api/api'
import '../css/UserProfile.css'

const UserProfile = props => {
	const {user} = useAuth0()
	const [key,setKey] = useState(0)
	const [loggedUser, setLoggedUser] = useState({
		"firstName": "",
        "lastName": "",
        "phone": "",
        "street": "",
        "city": "",
        "sector": "",
        "residency": "",
	})
	const [showPersonalInfo, setShowPersonalInfo] = useState(true)

	function togglePanels() {
		let x = !showPersonalInfo
		setShowPersonalInfo(x)
	}

	useEffect(() =>{
		async function getdata() {
			let userId = user.sub.split("|")[1]
			let obj = await api.user().get(userId)
			setLoggedUser(obj.content)
		}
		getdata()
	},[])

	return (
		<div key={key}id='user-profile'>
			<TopNav isBordered={true} />
			<div id="main-panels">
				<div id="options-panel">
					<div id="user-meta">
						<p id="user-logo">{loggedUser.firstName.length > 0? loggedUser.firstName[0].toUpperCase(): ''}</p>
						<p id="meta-title">{loggedUser.firstName}'s Account</p>
						<p id="meta-sub">Thanks for choosing Radical, {loggedUser.firstName}</p>
					</div>
					<hr style={{width: '80%'}}/>
					<div id="option-categories">
						<div id="info-security" onClick={(e) => {
							e.preventDefault();
							togglePanels();
						}} className={showPersonalInfo?"selected-option": undefined}>
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
	{showPersonalInfo? <InfoPanel user={loggedUser} />: <ShippingInfoPanel user={loggedUser} /> }
				</div>		
			</div>
			<Footer position="relative" bottom="1vh" />
		</div>
	);
};


export default withAuthenticationRequired(UserProfile, {
	// Show a message while the user waits to be redirected to the login page.
	onRedirecting: () => (<div>Redirecting...</div>)
  });