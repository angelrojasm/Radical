import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Components/Breadcrumb';
import TopNav from '../Components/TopNav';
import '../css/Category.css';

const Category = props => {
	return (
		<div id='category'>
			<TopNav isBordered={true} />
			<div className='body-container'>
				<div id='intro'>
					<div id='products-meta'>
						<Breadcrumb categoryName={props.match.params.name} />
						<h2>{props.match.params.name}</h2>
						<p>Showing: X-Y out of Z Items</p>
					</div>
					<div id='sort-bar'>
						<button>Test Button</button>
					</div>
				</div>
				<div className='products-body'></div>
			</div>
		</div>
	);
};

export default Category;
