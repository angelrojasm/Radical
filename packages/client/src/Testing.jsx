import React from 'react';
import { useState } from 'react';
import api from './api/api';

const Testing = props => {
	const [img, setImg] = useState();
	const [file, setFile] = useState();

	const uploadImage = async () => {
		let formData = new FormData();
		formData.append('fileName', file.name);
		let data = await api.item().create(formData);
		//setImg(data);
		console.log(data);
	};

	const getImage = async () => {
		let data = await api.item().get();
		console.log(data);
		setImg(data.items[0].imgData.data);
	};
	return (
		<div id='name'>
			<div>Hola</div>
			<input
				type='file'
				onChange={e => {
					setFile(e.target.files[0]);
				}}
			/>{' '}
			<span>upload image</span>
			<button onClick={uploadImage}>upload</button>
			<button onClick={getImage}>See image</button>
			<img src={img} alt='lol' />
		</div>
	);
};
export default Testing;
