import React from 'react';
import { BackgroundCarousel } from '../Components/BackgroundCarousel';
import TopNav from '../Components/TopNav';

const Home = () => {
	return (
		<div className='Home'>
			<TopNav isBordered={false} />
			<BackgroundCarousel />
		</div>
	);
};

export default Home;
