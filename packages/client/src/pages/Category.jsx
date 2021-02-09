import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import TopNav from '../Components/TopNav';
import ItemList from '../Components/ItemList';
import Footer from '../Components/Footer';
import '../scss/Category.scss';
import Pagination from '../Components/Pagination';
import { useHistory } from 'react-router-dom';

const products = [
	{
		image: 'IMG_0284.jpg',
		title: 'Long Sleeved Jacket (White)',
		price: '700.00',
	},
	{
		image: 'DSC_0528 copy.jpg',
		title: "Women's Crop Top (Black)",
		price: '500.00',
	},
	{
		image: 'IMG_0197.jpg',
		title: 'Personalized Cap (Black)',
		price: '600.00',
	},
	{
		image: 'DSC_0258 copy.jpg',
		title: 'Short Sleeved Tee (White)',
		price: '550.00',
	},
	{
		image: 'IMG_1019.jpg',
		title: 'Long Sleeved Jacket (Gray)',
		price: '700.00',
	},
	{
		image: 'IMG_0759.jpg',
		title: 'Short Sleeved Tee (Black)',
		price: '550.00',
	},
	{
		image: 'IMG_0273.jpg',
		title: 'Personalized Shorts (Black)',
		price: '850.00',
	},
	{
		image: 'IMG_0325.jpg',
		title: 'Personalized Jeans',
		price: '1000.00',
	},
];

const Category = props => {
	const history = useHistory();
	const [paginationIndex, setPaginationIndex] = useState(1);
	const [itemCount, setItemCount] = useState(6);

	function switchNextPage() {
		setPaginationIndex(paginationIndex + 1);
	}
	function switchPreviousPage() {
		setPaginationIndex(paginationIndex - 1);
	}
	function goToProfile(title, link) {
		props.history.push({
			pathname: `/categories/${props.match.params.name}/${title}`,
			state: { image: link },
		});
	}
	return (
		<div id='category'>
			<TopNav id='topnav' isBordered={true} />
			<div className='body-container'>
				<div id='intro'>
					<div id='products-meta'>
						<Breadcrumb categoryName={props.match.params.name} />
						<h1>{props.match.params.name}</h1>
						<p>Showing: 1-8 out of 15 items</p>
					</div>
					<div id='sort-bar'>
						<p>Sort By</p>
						<div className='dropdown'>
							<button
								type='button'
								id='sort-dropdown'
								className='dropdown-button btn-sm dropdown-toggle'
								data-toggle='dropdown'>
								{props.location.search === ''
									? 'Sample Data'
									: props.location.search.split('=')[1]}{' '}
							</button>
							<div className='dropdown-menu'>
								<a
									className='dropdown-item'
									href={`/categories/${props.match.params.name}?order=Option1`}>
									Option 1
								</a>

								<a
									className='dropdown-item'
									href={`/categories/${props.match.params.name}?order=Option2`}>
									Option 2
								</a>
							</div>
						</div>
					</div>
				</div>
				<div id='products-body'>
					<ItemList
						items={products}
						index={paginationIndex}
						count={itemCount}
						redirect={goToProfile}
					/>
					<Pagination next={switchNextPage} prev={switchPreviousPage} />
				</div>
			</div>
			<Footer position='relative' bottom='0' />
		</div>
	);
};

export default Category;
