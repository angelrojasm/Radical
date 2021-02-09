import React, { useState } from 'react';

import '../scss/BackgroundCarousel.scss';
const BackgroundCarousel = props => {
	return (
		<div id='carouselExample' className='carousel slide' data-ride='carousel'>
			<ol className='carousel-indicators'>
				<li data-target='#carouselExample' data-slide-to='0' className='active'></li>
				<li data-target='#carouselExample' data-slide-to='1'></li>
				<li data-target='#carouselExample' data-slide-to='2'></li>
			</ol>
			<div className='carousel-inner'>
				<div className='carousel-item active'>
					<div className='d-block w-100 slide slide1' />
				</div>
				<div className='carousel-item'>
					<div className='d-block w-100 slide slide2' />
				</div>
				<div className='carousel-item'>
					<div className='d-block w-100 slide slide3' />
				</div>
			</div>
		</div>
	);
};

export default BackgroundCarousel;
