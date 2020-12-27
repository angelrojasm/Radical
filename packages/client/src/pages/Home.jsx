import React from 'react';
import {Footer, TopNav, BackgroundCarousel} from '../Components/index'

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
