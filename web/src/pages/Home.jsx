import React from 'react';
import { BackgroundCarousel } from '../Components/BackgroundCarousel';
import TopNav from '../Components/TopNav';
import Footer from '../Components/Footer';

const Home = () => {
	return (
		<div className='Home'>
			<TopNav isBordered={false} />
			<BackgroundCarousel />
			<Footer position='fixed' bottom='0' />
		</div>
	);
};

export default Home;
