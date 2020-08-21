import React, { useState, useEffect } from 'react';

const Pagination = props => {
	return (
		<div id='pagination'>
			<div>
				<ul className='pagination justify-content-center'>
					<li className='page-item'>
						<button
							className='page-link'
							onClick={e => {
								e.preventDefault();
								props.prev();
							}}
							aria-label='Previous'>
							<span aria-hidden='true'>&laquo; Previous</span>
							<span className='sr-only'>Previous</span>
						</button>
					</li>

					<li className='page-item'>
						<button
							className='page-link'
							onClick={e => {
								e.preventDefault();
								props.next();
							}}
							aria-label='Next'>
							<span aria-hidden='true'>Next &raquo;</span>
							<span className='sr-only'>Next</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};
export default Pagination;
