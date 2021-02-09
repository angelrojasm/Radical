import React, { useState, useEffect } from 'react';
import Item from './Item';
import '../scss/ItemList.scss';

const ItemList = props => {
	function renderItems() {
		return props.items.map((item, index) => {
			let lowerBound = props.count * (props.index - 1);
			let higherBound = props.index * props.count;
			if (index >= lowerBound && index < higherBound) {
				return <Item key={index} item={item} redirect={props.redirect} />;
			}
		});
	}
	return <div id='item-list'>{renderItems()}</div>;
};
export default ItemList;
