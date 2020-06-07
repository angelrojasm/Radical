import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import slide1 from '../images/IMG_0193.jpg';
import slide2 from '../images/IMG_0273.jpg';
import slide3 from '../images/IMG_0759.jpg';
import '../css/Body.css';
export const Body = props => {
	return (
		<Carousel id='main'>
			<Carousel.Item>
				<div className='d-block w-100 slide slide1' alt='First slide' />
				<Carousel.Caption>
					<h3>First slide label</h3>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<div className='d-block w-100 slide slide2' alt='Second slide' />

				<Carousel.Caption>
					<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<div className='d-block w-100 slide slide3' alt='Third slide' />

				<Carousel.Caption>
					<h3>Third slide label</h3>
					<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};
