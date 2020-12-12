import React, {useState, useEffect} from 'react';
import TopNav from '../Components/TopNav';
import Footer from '../Components/Footer';
import CartItem from '../Components/CartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart } from '@fortawesome/free-solid-svg-icons';
import '../css/likes.css'

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

function fillItemList(){
    return products.map((item,index) =>{
        if(index === products.length - 1) {
        return (
            <div key={index} id="likes-item-entry" className="body">
                <CartItem image={baseUrl + item.image} title={item.title} />
                <div id="price-section">
                        <p>
                            <strong>RD${item.price}</strong>
                        </p>
                        <div id="delete-icon">
                            <FontAwesomeIcon id="delete" icon={faHeart} />
                            <span>Unlike</span>
                        </div>
                    </div>
            </div>
        )
    }
        else {
            return (
                <div key={index} className="body" id="likes-item-entry">
                    <CartItem image={baseUrl + item.image} title={item.title} />
                    <div id="price-section">
                            <p>
                                <strong>RD${item.price}</strong>
                            </p>
                            <div id="delete-icon">
                                <FontAwesomeIcon id="delete" icon={faHeart} />
                                <span>Unlike</span>
                            </div>
                        </div>
                </div>
            )
        }
    })
}

const Likes = (props) => {
return (
    <div id='likes'>
    <TopNav isBordered={true} />
    <div id="likes-meta">
        <h3>Liked Items</h3>
        <p>3 Items in View</p>
    </div>
    <div id="likes-items">
        {fillItemList()}
    </div>
    <Footer id="footer" position="relative" bottom="0" />
    </div>
)
}
 export default Likes