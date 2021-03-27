import React from 'react';
import { TopNav, Footer, Breadcrumb, CollapsableItem, CustomItemForm } from '../Components/index';
import '../scss/Personalized.scss';
const Personalized = props => {
	return (
		<div id='personalized'>
			<TopNav isBordered={true} />
			<div id='main'>
				<div id='title-section'>
					<Breadcrumb categoryName='Personalized' />
					<h2 id='title'>Custom Design</h2>
					<p>Which item would you like to personalize?</p>
				</div>
				<div className='custom-item-section'>
					<p className='item-caption'>Jean Jacket</p>
					<CollapsableItem
						itemImage={process.env.REACT_APP_BASE_URL + 'Jean-Jacket-base.png'}
						itemType='jean-jacket'
					/>
				</div>
				<div className='custom-item-section'>
					<p className='item-caption'>Caps</p>
					<CollapsableItem
						itemImage={process.env.REACT_APP_BASE_URL + 'caps.jpeg'}
						itemType='cap'
					/>
				</div>
				<div className='custom-item-section'>
					<p className='item-caption'>Shirts</p>
					<CollapsableItem
						itemImage={process.env.REACT_APP_BASE_URL + 'Jean-Jacket-base.png'}
						itemType='shirt'
					/>
				</div>
			</div>
			<Footer position='relative' bottom='-10vh' />
		</div>
	);
};
export default Personalized;
