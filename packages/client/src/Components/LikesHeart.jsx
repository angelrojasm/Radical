import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import api from '../api/api';
import { useAuth0 } from '@auth0/auth0-react';

const LikesHeart = ({ itemId }) => {
	const { user, isAuthenticated } = useAuth0();
	const [isHovering, setIsHovering] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		async function getData() {
			let response = await api.likes().getItems(user.sub.split('|')[1]);
			let arr = response.content;
			for (let item of arr) {
				if (itemId === item.itemId) {
					setIsLiked(true);
				}
			}
		}
		if (isAuthenticated) {
			getData();
		}
	}, [isAuthenticated]);
	function handleMouseIn(e) {
		e.preventDefault();
		if (!isHovering) {
			setIsHovering(true);
		}
	}

	function handleMouseOut(e) {
		e.preventDefault();
		if (isHovering) {
			setIsHovering(false);
		}
	}

	async function addToLikes() {
		if (!isLiked) {
			if (isAuthenticated) {
				let response = await api.likes().addItem(user.sub.split('|')[1], itemId);
				if (!response.error) {
					setIsLiked(true);
				}
			}
		}
	}
	return (
		<FontAwesomeIcon
			className='like'
			icon={isLiked ? solidHeart : isHovering ? solidHeart : regHeart}
			onMouseEnter={e => {
				handleMouseIn(e);
			}}
			onMouseLeave={e => {
				handleMouseOut(e);
			}}
			onClick={e => {
				e.preventDefault();
				addToLikes();
			}}
			style={(isLiked || isHovering) && { color: 'red', cursor: 'pointer' }}
			size='lg'
		/>
	);
};
export default LikesHeart;
