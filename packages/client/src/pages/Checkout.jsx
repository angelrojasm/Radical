import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {TopNav, Footer, OrderRecap, ModalPopup} from '../Components/index'
import useForm from '../hooks/useForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Spinner } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import '../css/Checkout.css'

const Checkout = (props) => {
    const history = useHistory();
    const [loading,setLoading] = useState()
    const [show,setShow] = useState()
    const [billingInfo,setBillingInfo] = useForm({
        name: '',
        email: '',
        street: '',  
        sector: '',
        city: '',
        residency: ''
    })
    const [paymentOption,setPaymentOption] = useState('paypal')
    const [shippingOption, setShippingOption] = useState('delivery')
    const [shippingCost, setShippingCost] = useState('200.00')
    const [file,setFile] = useState()

    function handleApprove() {
        alert('ute pago')
        history.push('/')
    }
    
    useEffect(() => {
        
    })
    
    useEffect(() => {
        shippingOption === 'delivery'? setShippingCost('200.00'): setShippingCost('0.00')
    },[shippingOption])

    
    return (
        <div id='checkout' >
            <TopNav isBordered={true} />
            <div id="main-container">
                <div id="checkout-info">
                    <div className="section">
                        <p className="section-title">Billing Information</p>
                        <div className="attribute">
                            <p className="attribute-title">Name</p>
                            <input type="text" className="input" value ={billingInfo.name} name="name" onChange={(e) => {setBillingInfo(e)}}/>
                        </div>

                        <div className="attribute">
                            <p className="attribute-title">Email</p>
                            <input type="email" className="input" value ={billingInfo.email} name="email" onChange={(e) => {setBillingInfo(e)}}/>
                        </div>
                        <div className="attribute">
                            <p className="attribute-title">Address</p>
                            <input type="text" className="input" value ={billingInfo.street} name="street" onChange={(e) => {setBillingInfo(e)}}/>
                        </div>
                        <div id="city-info">
                            <div className="attribute">
                                <p className="attribute-title">City</p>
                                <input type="text" className="input" value ={billingInfo.city} name="city" onChange={(e) => {setBillingInfo(e)}}/>
                            </div>
                            <div className="attribute">
                                <p className="attribute-title">Sector</p>
                                <input type="text" className="input" value ={billingInfo.sector} name="sector" onChange={(e) => {setBillingInfo(e)}}/>                
                            </div>
                        </div>
                        <div className="attribute">
                            <p className="attribute-title">Residency</p>
                            <input type="text" className="input" value ={billingInfo.residency} name="residency" onChange={(e) => {setBillingInfo(e)}}/>
                        </div>
                    </div>
                    <div className="section">
                        <div id="payment-popup-div">
                            <p className="section-title"
                                id="payment-title">Payment Information</p>
                            <Popup trigger = {<button style={{border: 'none', background: "none", outline: "none", height: "fit-content"}}><FontAwesomeIcon icon={faInfoCircle}/></button>} position="right center">
                            <p style={{ fontSize: "0.75em"}}>Radical only accepts bank transfers made to: <br/>Bank X <br/>Account Number #1111111 <br/>Titular Name: John Smith</p>
                            </Popup>
                        </div>
                            <div className="radio-option">
                                <input type="radio" defaultChecked className="radio-input" value="paypal" name="payment-option" id="paypal" onChange={(e) => {setPaymentOption(e.target.value)}}/>
                                <label htmlFor="paypal">Paypal</label>
                                <FontAwesomeIcon className="icon"icon={faPaypal} />
                            </div>
                            <div className="radio-option">    
                                <input type="radio" value="transfer" name="payment-option" id="transfer" className="radio-input"
                                onChange={(e) => {setPaymentOption(e.target.value)}}/>
                                <label htmlFor="transfer">Transfer</label>
                                <FontAwesomeIcon className="icon"icon={faMoneyBill} />
                            </div>
                            {paymentOption === 'transfer' &&
                            (
                            <div>
                                <div className="attribute">
                                <p className="attribute-title">Transfer Receipt:</p>
                                <input type="file" onChange={(e) => {setFile(e.target.value)}}/>
                                </div>
                            </div>
                            )}
                    </div>
                    <div className="section">
                    <p className="section-title">Shipping Information</p>
                            <div className="radio-option">
                                <input type="radio" defaultChecked className="radio-input"
                                value="delivery" name="shipping-option" id="delivery" onChange={(e) => {
                                setShippingOption(e.target.value)
                                }}/>
                                <label htmlFor="paypal">Delivery(RD$200.00)</label>
                            </div>
                            <div className="radio-option">    
                                <input type="radio" value="pickup"
                                className="radio-input" name="shipping-option" id="pickup" onChange={(e) => {
                                setShippingOption(e.target.value);
                                }}/>
                                <label htmlFor="transfer">Pick Up (RD$0.00)</label>
                            </div>
                    </div>
                    {paymentOption === 'transfer' && (
                        <div id="transfer-modal">
                        <Button style={{
                            backgroundColor: '#22dd77',
                            width: '100%',
                            border: 'none',
                            fontSize: '1.15em'
                            }} onClick={(e) => {setShow(true); setLoading(true)}}>
                        Place Order
                        </Button>
                        <Modal
                            show={show}
                            onHide={(e) => {
                                setShow(false)
                            }}
                            backdrop="static"
                            keyboard={false}
                            
                        >
                            <Modal.Header closeButton>
                                <strong>Payment Section</strong>
                            </Modal.Header>
                            <Modal.Body>
                                {loading && (
                                <>    
                                    <Spinner style={{marginLeft: '45%'}} animation="border" variant="primary" />
                                    <p style={{textAlign: 'center'}}>Placing Order...</p> 
                                </>
                                )}
                            </Modal.Body>
                        </Modal>
                    </div>
                    )}
                    
                    {paymentOption === 'paypal' && <ModalPopup shippingCost={shippingCost} onApprove={handleApprove} />}
                </div>
                <OrderRecap shippingCost={shippingCost}/>
            </div>
            <Footer />
        </div>
    )
}
 export default Checkout;