import React, {useState, useEffect} from 'react';
import '../css/ShippingInfoPanel.css'
import EditInput from '../Components/EditInput'


const ShippingInfoPanel = (props) => {
    const [street,setStreet] = useState('Calle Tiradentes #1')
    const [residency,setResidency] = useState('Apt XYZ-2B')
    const [city,setCity] = useState('Santo Domingo, DN')
    const [sector,setSector] = useState('Paraiso')


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
            <EditInput id="edit-input" value={street} changeValue={changeStreet}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">Residency</p>
            <EditInput id="edit-input" value={residency} changeValue={changeResidency}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">City</p>
                <EditInput id="edit-input" value={city} changeValue={changeCity}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">Sector</p>
                <EditInput id="edit-input" value={sector} changeValue={changeSector}/>
        </div>

    </div>
</div>
)
}
 export default ShippingInfoPanel;