import React, { useState, useEffect } from 'react';
import '../css/Slider.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Slider = props => {
	const [position, setPosition] = useState(props.offset);

	useEffect(() => {
		setPosition(props.offset);
	}, [props.offset]);

	const handleMouseLeave = () => {
		props.hideSlider();
	};

	const handleClick = () => {
		setPosition(-30);
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
				<li id='hello'>
					<Link to={{ pathname: '/categories/T-shirts' }}>TSHIRTS</Link>
				</li>
				<li>
					<Link to={{ pathname: '/categories/Jean Jackets' }}>JEAN JACKETS</Link>
				</li>
				<li>
					<Link to={{ pathname: '/categories/Caps' }}>GORRAS</Link>
				</li>
				<li>
					<Link to={{ pathname: '/categories/Custom Design' }}>PERSONALIZADOS</Link>
				</li>
			</ul>
		</div>
	);
};
export default Slider;
