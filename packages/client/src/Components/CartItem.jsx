import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import '../css/CartItem.css'

const CartItem = (props) => {
    const history = useHistory();

    function redirect(title, link) {
		history.push({
			pathname: `/categories/$T-shirts/${title}`,
			state: { image: link },
        });
    }
return (
    <div id='cart-item'>
        <img src={props.image} 
        onClick={e => {
            e.preventDefault();
            redirect(props.title, props.image);
        }}/>
        
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