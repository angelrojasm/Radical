import React, { useState, useEffect } from 'react';
import '../scss/Slider.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../api/api';
import { Link } from 'react-router-dom';

const Slider = props => {
	const { user, isAuthenticated } = useAuth0();
	const [canLoad, setCanLoad] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [position, setPosition] = useState(props.offset);

	useEffect(() => {
		setPosition(props.offset);
	}, [props.offset]);

	useEffect(() => {
		setTimeout(() => {
			setCanLoad(true);
		}, 1400);
	}, []);

	useEffect(() => {
		async function getData() {
			if (isAuthenticated) {
				let response = await api.admin().isAdmin(user.email);
				if (response.isAdmin) {
					setIsAdmin(true);
				}
			}
		}
		if (canLoad) {
			getData();
		}
	}, [canLoad]);

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
					<a href='/categories/Tops'>TOPS</a>
				</li>
				<li>
					<a href='/categories/Jean Jackets'>JEAN JACKETS</a>
				</li>
				<li>
					<a href='/categories/Caps'>CAPS</a>
				</li>
				<li>
					<a href='/Personalized'>PERSONALIZED</a>
				</li>
			</ul>
			{isAdmin && (
				<button id='admin-panel' className='btn btn-primary'>
					<Link to={{ pathname: '/admin/panel' }}>Admin Panel</Link>
				</button>
			)}
		</div>
	);
};
export default Slider;
