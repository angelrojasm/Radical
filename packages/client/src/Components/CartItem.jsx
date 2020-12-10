import React, {useState, useEffect} from 'react';
import '../css/CartItem.css'

const CartItem = (props) => {
return (
    <div id='cart-item'>
        <img src={props.image} />
        <div id="item-meta">
            <p id="title">{props.title}</p>
            <p>Color: Orange</p>
            <p className="show-mobile">Quantity: 1</p>    
            <p>Size: M</p>
        </div> 
    </div>
)
}
 export default CartItem;