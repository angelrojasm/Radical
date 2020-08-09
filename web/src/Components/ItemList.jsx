import React, { useState, useEffect } from 'react';
import Item from './Item';
import '../css/ItemList.css';

const ItemList = props => {
	function renderItems() {
		return props.items.map((item, index) => {
			return <Item key={index} item={item} />;
		});
	}
	return <div id='item-list'>{renderItems()}</div>;
};
export default ItemList;
