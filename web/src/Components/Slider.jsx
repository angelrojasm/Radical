import React, { useState, useEffect } from 'react';
import '../css/Slider.css';

export const Slider = props => {
	const [position, setPosition] = useState(props.offset);

	useEffect(() => {
		setPosition(props.offset);
	}, [props.offset]);

	const handleMouseLeave = () => {
		props.hideSlider();
	};

	return (
		<div
			className='slider'
			style={{ position: props.position, left: position + '%' }}
			onMouseLeave={handleMouseLeave}>
			<h2>
				<strong>Categorias</strong>
			</h2>
			<ul className='categories'>
				<li>Tshirts</li>
				<li>Jean Jackets</li>
				<li>Gorras</li>
				<li>Personalizados</li>
			</ul>
		</div>
	);
};
