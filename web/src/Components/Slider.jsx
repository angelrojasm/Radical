import React, { useState, useEffect } from 'react';
import '../css/Slider.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Slider = props => {
	const [position, setPosition] = useState(props.offset);

	useEffect(() => {
		setPosition(props.offset);
	}, [props.offset]);

	const handleMouseLeave = () => {
		props.hideSlider();
	};

	const handleClick = () => {
		setPosition(-110);
	};

	return (
		<div
			className='slider'
			style={{ position: props.position, left: position + '%' }}
			onMouseLeave={handleMouseLeave}>
			<FontAwesomeIcon className='exit' icon={faTimes} size='lg' onClick={handleClick} />
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
