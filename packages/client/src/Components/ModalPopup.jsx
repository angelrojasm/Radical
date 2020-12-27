import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap'
import PayPalButtons from './PayPalButtons'
import OrderRecap from './OrderRecap'


const ModalPopup = ({shippingCost, onApprove}) => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
        <Button style={{
            backgroundColor: '#22dd77',
            width: '100%',
            border: 'none',
            fontSize: '1.15em'
            }} onClick={handleShow}>
           Place Order
        </Button>
    
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <strong>Payment Section</strong>
            </Modal.Header>
            <Modal.Body>
                <OrderRecap shippingCost={shippingCost} isPopup={true} />
            </Modal.Body>
            <p style={{fontSize: '0.7em', color: 'red',textAlign: 'center'}}>* Payments made through paypal will be charged in USD.</p>
            <Modal.Footer>
            <div style={{width: '80%', margin: '0 auto'}}>
                <PayPalButtons orderAmount="1000" onApprove={onApprove}/>
            </div>
            </Modal.Footer>
        </Modal>
        </>
    );
}
 export default ModalPopup;