import React, {useState, useEffect} from 'react';
import '../css/OrderRecap.css'

const orderItems = [
    {
        title: '1 x Long Sleeved White tee',
        desc: 'Radical Long sleeved white tee',
        price: 100.00
    },
    {
        title: '1 x Long Sleeved White tee',
        desc: 'Radical Long sleeved white tee',
        price: 100.00
    },
    {
        title: '1 x Long Sleeved White tee',
        desc: 'Radical Long sleeved white tee',
        price: 100.00
    },
    {
        title: '1 x Long Sleeved White tee',
        desc: 'Radical Long sleeved white tee',
        price: 100.00
    },
    {
        title: '1 x Long Sleeved White tee',
        desc: 'Radical Long sleeved white tee',
        price: 100.00
    },
    {
        title: '1 x Long Sleeved White tee',
        desc: 'Radical Long sleeved white tee',
        price: 100.00
    }
]
const OrderRecap = ({shippingCost = '0.00', isPopup = false}) => {

    function renderOrderItems() {
        return orderItems.map((item,index) => {
            if( index=== orderItems.length-1) {
                return (
                    <div key={index}>    
                        <div className="item-div">
                            <div className="item-meta">
                                <p className="item-title">1 x Long Sleeved White tee</p>
                                <p className="item-desc">Radical Long sleeved white tee</p>
                            </div>
                            <p>RD$100.00</p>
                        </div>
                        <hr style={{width: "100%"}}/>
                    </div>
                )
            }
        else {
            return (
                <div key={index}>
                    <div className="item-div">
                        <div className="item-meta">
                            <p className="item-title">1 x Long Sleeved White tee</p>
                            <p className="item-desc">Radical Long sleeved white tee</p>
                        </div>
                        <p>RD$100.00</p>
                    </div>
                    <hr/>
                </div>
            )
        }
        })
    }
    return (
        <div id="order-info" style={isPopup?{margin: '1% auto 2% auto', width: '90%',}: {}}>
            <p className="section-title">Order Summary</p>
            {renderOrderItems()}
            <div id="total-price-div">
                <p id="order-total">Sub Total: <strong>RD$300.00</strong></p>
                <p id="shipping-cost">Shipping: <strong>RD${shippingCost}</strong></p>
                <hr/>
                    <p id="total-price">Total: <strong>RD${shippingCost === '200.00'?'500.00': '300.00'}</strong></p>
            </div>
        </div>
    )
}
 export default OrderRecap;