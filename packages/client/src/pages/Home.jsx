import React from 'react';
import { BackgroundCarousel } from '../Components/BackgroundCarousel';
import TopNav from '../Components/TopNav';
import Footer from '../Components/Footer';
import useWindowDimensions from '../Components/Dimensions';

const Home = () => {
	const { height, width } = useWindowDimensions();

	return (
		<div className='Home'>
			<TopNav isBordered={false} />
			<BackgroundCarousel />
			<Footer width={width} isHome={true} position='fixed' bottom='0' />
		</div>
	);
};

export default Home;
