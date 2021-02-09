import React, { useState, useEffect } from 'react';
import Topnav from '../Components/TopNav';
import Breadcrumb from '../Components/Breadcrumb';
import Footer from '../Components/Footer';
import '../scss/ItemProfile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart as Heart } from '@fortawesome/free-regular-svg-icons';

const ItemProfile = props => {
	useEffect(() => {
		console.log(props);
	}, []);
	return (
		<div id='item-profile'>
			<Topnav isBordered={true} />
			<div id='body'>
				<Breadcrumb
					isProfile={true}
					categoryName={props.match.params.name}
					itemName={props.match.params.item}
				/>
				<div className='flex'>
					<img id='profile-image' src={props.location.state.image} alt='picture profile' />
					<div id='product-info-body'>
						<h2>{props.match.params.item}</h2>
						<div id='ratings'>
							<div id='stars'>
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
								<FontAwesomeIcon className='star' icon={faStar} size='2x' />
							</div>
							<h3>35 Reviews</h3>
						</div>
						<h3 id='price'> RD$500.00</h3>
						<div id='size'>
							<h4>Size: </h4>
							<select id='size-select'>
								<option value='S'>S</option>
								<option value='M'>M</option>
								<option value='L'>L</option>
							</select>
						</div>
						<div id='options'>
							<button>Add to Cart</button>
							<div id='icon-div'>
								<FontAwesomeIcon icon={Heart} size='2x' />
								<h4>Add to Wishlist</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer position='relative' bottom='-10vh' />
		</div>
	);
};
export default ItemProfile;
