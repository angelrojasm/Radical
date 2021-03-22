import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import TopNav from '../Components/TopNav';
import ItemList from '../Components/ItemList';
import Footer from '../Components/Footer';
import '../scss/Category.scss';
import Pagination from '../Components/Pagination';
import { useHistory } from 'react-router-dom';
import api from '../api/api';
import WithAlert from '../hoc/withAlert';

const Category = props => {
	const history = useHistory();
	const [paginationIndex, setPaginationIndex] = useState(1);
	const [itemCount, setItemCount] = useState(16);
	const [products, setProducts] = useState([]);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		async function getData() {
			let type = props.match.params.name;
			let items = await api.item().get();
			let itemArr = items.items;
			let products = itemArr.filter(element => {
				return element.category === type.toLowerCase();
			});
			if (props.location.search !== '') {
				let filter = props.location.search.split('=')[1];
				switch (filter) {
					case 'Name':
						products.sort((a, b) => {
							if (a.title < b.title) {
								return -1;
							}
							if (a.title > b.title) {
								return 1;
							}
							return 0;
						});
						break;
					case 'Recent':
						products.reverse();
						break;
					case 'Price':
						products.sort((a, b) => {
							return a.price - b.price;
						});
						break;
					default:
				}
			}
			setProducts(products);
		}
		getData();
	}, []);

	function toggleAlert() {
		setShowAlert(true);
	}
	function switchNextPage() {
		setPaginationIndex(paginationIndex + 1);
	}
	function switchPreviousPage() {
		setPaginationIndex(paginationIndex - 1);
	}
	function goToProfile(title, link, item) {
		props.history.push({
			pathname: `/categories/${props.match.params.name}/${title}`,
			state: { image: link, item: item },
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
						<p>
							Showing: 1-{products.length >= itemCount ? itemCount : products.length} out of{' '}
							{products.length} items
						</p>
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
									? 'Oldest to Newest'
									: props.location.search.split('=')[1]}
							</button>
							<div className='dropdown-menu'>
								<a
									className='dropdown-item'
									href={`/categories/${props.match.params.name}?order=Name`}>
									Name
								</a>

								<a
									className='dropdown-item'
									href={`/categories/${props.match.params.name}?order=Recent`}>
									Newest
								</a>
								<a
									className='dropdown-item'
									href={`/categories/${props.match.params.name}?order=Oldest`}>
									Oldest
								</a>
								<a
									className='dropdown-item'
									href={`/categories/${props.match.params.name}?order=Price`}>
									Price (Lowest to highest)
								</a>
							</div>
						</div>
					</div>
				</div>
				<div id='products-body'>
					<ItemList
						toggleAlert={toggleAlert}
						items={products}
						index={paginationIndex}
						count={itemCount}
						redirect={goToProfile}
					/>
					{products.length > itemCount && (
						<Pagination next={switchNextPage} prev={switchPreviousPage} />
					)}
				</div>
			</div>
			<Footer position='relative' bottom='0' />
		</div>
	);
};

export default Category;
