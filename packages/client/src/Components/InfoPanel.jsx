import React, {useState, useEffect} from 'react';
import '../css/InfoPanel.css'
import EditInput from '../Components/EditInput'


const InfoPanel = ({user}) => {
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()
    const [phone,setPhone] = useState()


    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setPhone(user.phone)
    },[user])

    function changeFirstName(value) {
        setFirstName(value)
    }

    function changeLastName(value) {
        setLastName(value)
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
            <p className="edit-input">{email}</p>
        </div>
    </div>
    <div id="personal-info-section" className="section">
        <p className="section-title">Personal Info</p>
        <div className="attribute">
            <p className="attribute-title">First Name</p>
            <EditInput className="edit-input" field="firstName" value={firstName} changeValue={changeFirstName}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">Last Name</p>
            <EditInput className="edit-input" field="lastName" value={lastName} changeValue={changeLastName}/>
        </div>
        <div className="attribute">
            <p className="attribute-title">Phone</p>
                <EditInput className="edit-input" field="phone" value={phone} changeValue={changePhone}/>
        </div>
    </div>
</div>
)
}
 export default InfoPanel;