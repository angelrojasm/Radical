import React, {useState, useEffect} from 'react';
import TopNav from '../Components/TopNav';
import Footer from '../Components/Footer';
import CartItem from '../Components/CartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/Cart.css'

const baseUrl = 'http://du9yuz2ex8zdk.cloudfront.net/'
const products = [
	{
		image: 'IMG_0284.jpg',
		title: 'Long Sleeved Jacket (White)',
		price: '700.00',
	},
	{
		image: 'DSC_0528 copy.jpg',
		title: "Women's Crop Top (Black)",
		price: '500.00',
	},
	{
		image: 'IMG_0197.jpg',
		title: 'Personalized Cap (Black)',
		price: '600.00',
    },
]

function fillTable() {
    return products.map((item,index) => {
        if(index === products.length - 1) {
            return (
                <tr key={index} style={{marginRight: '10vw'}}>
                    <td>
                        <CartItem image={baseUrl + item.image} title={item.title} />
                    </td>
                    <td>
                        <input type="number" name="Quantity" id="quantity-input" placeholder="1" min="1" step="1"/>
                    </td>
                    <td>
                        <div id="price-section">
                            <p>
                                <strong>RD${item.price}</strong>
                            </p>
                            <div id="delete-icon">
                                <FontAwesomeIcon id="delete" icon={faTrash} />
                                <span>Remove</span>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        }
        else {
            return (
                <tr className="body" key={index} style={{marginRight: '10vw'}}>
                    <td>
                        <CartItem image={baseUrl + item.image} title={item.title} />
                    </td>
                    <td>
                        <input type="number" name="Quantity" id="quantity-input" placeholder="1" min="1" step="1"/>
                    </td>
                    <td>
                        <div id="price-section">
                            <p>
                                <strong>RD${item.price}</strong>
                            </p>
                            <div id="delete-icon">
                                <FontAwesomeIcon id="delete" icon={faTrash} />
                                <span>Remove</span>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        }
    })
}

function fillItemList(){
    return products.map((item,index) =>{
        if(index === products.length - 1) {
        return (
            <div key={index} id="cart-item-entry">
                <CartItem image={baseUrl + item.image} title={item.title} />
                <div id="price-section">
                        <p>
                            <strong>{item.price}</strong>
                        </p>
                        <div id="delete-icon">
                            <FontAwesomeIcon id="delete" icon={faTrash} />
                            <span>Remove</span>
                        </div>
                    </div>
            </div>
        )
    }
        else {
            return (
                <div key={index} className="body" id="cart-item-entry">
                    <CartItem image={baseUrl + item.image} title={item.title} />
                    <div id="price-section">
                            <p>
                                <strong>{item.price}</strong>
                            </p>
                            <div id="delete-icon">
                                <FontAwesomeIcon id="delete" icon={faTrash} />
                                <span>Remove</span>
                            </div>
                        </div>
                </div>
            )
        }
    })
}

const Cart = (props) => {
return (
    <div id='cart'>
    <TopNav isBordered={true} />
    <div id="cart-meta">
        <h3>Shopping Cart</h3>
        <p>3 Items in Cart</p>
    </div>
    <table className="show-desktop" id="cart-table">
        <thead>
            <tr id="table-header">
                <th style={{width: '55vw'}}>Item</th>
                <th style={{width: '15vw'}}>Qty</th>
                <th style={{width: '5vw'}}>Price</th>
            </tr>
        </thead>
        <tbody>
            {fillTable()}
        </tbody>
    </table>
    <div className="show-mobile" id="cart-items">
        {fillItemList()}
    </div>
    <hr/>
    <p id="total-price">Total: $1,800.00</p>
    <button id="checkout-button">CHECKOUT</button>
    <Footer position="relative" bottom="0" />
    </div>
)
}
 export default Cart