import React, { useState, useEffect } from 'react';
import Header from './Header';
import Slider from './Slider';
import useWindowDimensions from '../Components/Dimensions';

const TopNav = props => {
	const [offset, setOffset] = useState(-30);
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
		setOffset(-30);
	};
	return (
		<>
			<Slider offset={offset} position='fixed' hideSlider={hideSlider} />
			<Header
				isBordered={props.isBordered}
				showSlider={showSlider}
				position='fixed'
				top='0'
				offsetFlag={offset}
				width={sliderWidth}
				dimensionWidth={width}
				resize={resize}
			/>
		</>
	);
};

export default TopNav;
