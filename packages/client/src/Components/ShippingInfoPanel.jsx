import React, {useState, useEffect} from 'react';
import '../css/ShippingInfoPanel.css'
import EditInput from '../Components/EditInput'


const ShippingInfoPanel = ({user}) => {
    const [street,setStreet] = useState()
    const [residency,setResidency] = useState()
    const [city,setCity] = useState()
    const [sector,setSector] = useState()

    useEffect(() => {
        setStreet(user.street)
        setResidency(user.residency)
        setCity(user.city)
        setSector(user.sector)
    },[user])

    function changeStreet(value) {
        setStreet(value)
    }
    
    function changeResidency(value) {
        setResidency(value)
    }

    function changeCity(value) {
        setCity(value)
    }

    function changeSector(value) {
        setSector(value)
    }


return (
<div id='shipping-info-panel'>
	<p id="page-title">Shipping Info</p> 
    <hr style={{width: '95%'}}/>
    <div id="sign-in-section" className="section">
        <div className="attribute">
            <p className="attribute-title">Street</p>
            <EditInput id="edit-input" field="street" value={street} changeValue={changeStreet}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">Residency</p>
            <EditInput id="edit-input" field="residency" value={residency} changeValue={changeResidency}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">City</p>
                <EditInput id="edit-input" field="city" value={city} changeValue={changeCity}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">Sector</p>
                <EditInput id="edit-input" field="sector" value={sector} changeValue={changeSector}/>
        </div>
    </div>
</div>
)
}
 export default ShippingInfoPanel;