import React, { useState, useEffect } from 'react';
import { CustomItemForm } from '../Components/index';
import '../scss/CollapsableItem.scss';
const CollapsableItem = ({ itemImage, itemType }) => {
	const [active, setActive] = useState(false);

	return (
		<div id='collapsable-item' className={active ? 'collapsed' : ''}>
			<div
				className={active ? 'item-title selected' : 'item-title'}
				onClick={() => {
					let x = !active;
					setActive(x);
				}}>
				<img src={itemImage} />
			</div>
			<div className='collapsable-content'>
				<CustomItemForm itemType={itemType} />
			</div>
		</div>
	);
};
export default CollapsableItem;
