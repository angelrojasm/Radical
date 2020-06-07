import React, { useState, useEffect } from 'react';
import './App.css';
import { Slider } from './Components/Slider';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Body } from './Components/Body';
import useWindowDimensions from './Components/Dimensions';

function App() {
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
		width <= 500 ? setOffset(-110) : setOffset(-40);
	};
	return (
		<div className='App'>
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
}

export default App;
