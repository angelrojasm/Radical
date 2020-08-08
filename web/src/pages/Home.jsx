import React, { useState, useEffect } from 'react';
import { Slider } from '../Components/Slider';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import { Body } from '../Components/Body';
import useWindowDimensions from '../Components/Dimensions';

const Home = props => {
	const [offset, setOffset] = useState(-110);
	const [resize, setResize] = useState(false);
	const [sliderWidth, setSliderWidth] = useState('20vw');

	const { height, width } = useWindowDimensions();

	useEffect(() => {
		if (width > 500 && width < 850) {
			setSliderWidth('30vw');
		}
		if (width < 481) {
			setResize(true);
		}
	}, []);

	const showSlider = () => {
		setOffset(0);
	};

	const hideSlider = () => {
		setOffset(-110);
	};
	return (
		<div className='Home'>
			<Slider offset={offset} position='fixed' top='0' hideSlider={hideSlider} />
			<Header
				showSlider={showSlider}
				position='fixed'
				top='0'
				offsetFlag={offset}
				width={sliderWidth}
				dimensionWidth={width}
				resize={resize}
			/>
			<Body />
			<Footer position='fixed' top='90vh' />
		</div>
	);
};

export default Home;
