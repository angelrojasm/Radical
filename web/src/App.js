import React, { useState } from 'react';
import './App.css';
import { Slider } from './Components/Slider';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Body } from './Components/Body';

function App() {
	const [offset, setOffset] = useState(-30);

	const showSlider = () => {
		setOffset(0);
	};

	const hideSlider = () => {
		setOffset(-30);
	};
	return (
		<div className='App'>
			<Slider offset={offset} position='fixed' top='0' hideSlider={hideSlider} />
			<Header showSlider={showSlider} position='fixed' top='0' />
			<Body />
			<Footer position='fixed' top='90vh' />
		</div>
	);
}

export default App;
