import React from 'react';

const Breadcrumb = props => {
	return (
		<ol className='breadcrumb bg-transparent'>
			<li className='breadcrumb-item'>
				<a href='/'>Radical</a>
			</li>
			{props.isProfile ? (
				<>
					<li className='breadcrumb-item'>
						<a href={`/categories/${props.categoryName}`}>{props.categoryName}</a>
					</li>
					<li className='breadcrumb-item active'>{props.itemName}</li>
				</>
			) : (
				<li className='breadcrumb-item active'>{props.categoryName}</li>
			)}
		</ol>
	);
};
export default Breadcrumb;
