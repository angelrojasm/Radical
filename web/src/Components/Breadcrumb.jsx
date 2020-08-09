import React from 'react';

const Breadcrumb = props => {
	return (
		<ol className='breadcrumb bg-transparent'>
			<li className='breadcrumb-item'>
				<a href='/'>Radical</a>
			</li>
			<li className='breadcrumb-item'>Categorias</li>
			<li className='breadcrumb-item active' aria-current='page'>
				{props.categoryName}
			</li>
		</ol>
	);
};
export default Breadcrumb;
