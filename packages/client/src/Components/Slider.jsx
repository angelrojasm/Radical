import React, { useState, useEffect } from 'react';
import '../scss/Slider.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Slider = props => {
	const [position, setPosition] = useState(props.offset);

	useEffect(() => {
		setPosition(props.offset);
	}, [props.offset]);

	const handleMouseLeave = () => {
		props.hideSlider();
	};

	const handleClick = () => {
		setPosition(-100);
	};

	return (
		<div
			className='slider'
			style={{ position: props.position, left: position + '%', top: '0', width: props.width }}
			onMouseLeave={handleMouseLeave}>
			<FontAwesomeIcon className='exit' icon={faTimes} size='lg' onClick={handleClick} />
			<h2>
				<strong>Categorias</strong>
			</h2>
			<ul className='categories'>
				<li id='hello'>
					<a href='/categories/T-shirts'>TSHIRTS</a>
				</li>
				<li>
					<a href='/categories/Jean Jackets'>JEAN JACKETS</a>
				</li>
				<li>
					<a href='/categories/Caps'>GORRAS</a>
				</li>
				<li>
					<a href='/categories/Custom Designs'>PERSONALIZADOS</a>
				</li>
			</ul>
		</div>
	);
};
export default Slider;
