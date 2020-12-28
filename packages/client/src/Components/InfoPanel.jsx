import React, {useState, useEffect} from 'react';
import '../css/InfoPanel.css'
import EditInput from '../Components/EditInput'


const InfoPanel = (props) => {
    const [firstName,setFirstName] = useState('Jose')
    const [lastName,setLastName] = useState('Perez')
    const [email,setEmail] = useState('Jose@gmail.com')
    const [phone,setPhone] = useState('(809) 123-4567')


    function changeFirstName(value) {
        setFirstName(value)
    }

    function changeLastName(value) {
        setLastName(value)
    }
    function changeEmail(value) {
        setEmail(value)
    }

    function changePhone(value) {
        setPhone(value)
    }

return (
<div id='info-panel'>
	<p id="page-title">Personal Info</p> 
    <hr style={{width: '95%'}}/>
    <div id="sign-in-section" className="section">
        <p className="section-title">Session Info</p>
        <div className="attribute">
            <p className="attribute-title">Email</p>
            <EditInput id="edit-input" value={email} changeValue={changeEmail}/>
        </div>
    </div>
    <div id="personal-info-section" className="section">
        <p className="section-title">Personal Info</p>
        <div className="attribute">
            <p className="attribute-title">First Name</p>
            <EditInput id="edit-input" value={firstName} changeValue={changeFirstName}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">Last Name</p>
            <EditInput id="edit-input" value={lastName} changeValue={changeLastName}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">Phone</p>
                <EditInput id="edit-input" value={phone} changeValue={changePhone}/>
        </div>
    </div>
</div>
)
}
 export default InfoPanel;