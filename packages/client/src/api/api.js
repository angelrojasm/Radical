import axios from 'axios';

export default {
	user(route = '/user') {
		return {
			get: async userId => {
				let response = await fetch(`${route}?userId=${userId}`);
				let data = await response.json();
				return data;
			},
			create: async (userId, email, firstName, lastName) => {
				let response = await fetch(route, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userId: userId,
						email: email,
						firstName: firstName,
						lastName: lastName,
					}),
				});
				let data = await response.json();
				return data;
			},
			update: async (field, value) => {
				let response = await fetch(route, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						field: field,
						value: value,
					}),
				});
				let data = await response.json();
				return data;
			},
		};
	},
	item(route = '/item') {
		return {
			get: async () => {
				let response = await fetch(`${route}`);
				let data = await response.json();
				return data;
			},
			getItem: async itemId => {
				let response = await fetch(`${route}/find?itemId=${itemId}`);
				let data = await response.json();
				return data;
			},
			create: async form => {
				let data = axios
					.post(route, form)
					.then(function (response) {
						return response.data;
					})
					.catch(function (error) {
						return error;
					});
				return data;
			},
		};
	},
	cart(route = '/cart') {
		return {
			getItems: async userId => {
				let response = await axios.get(`${route}?userId=${userId}`);
				return response.data;
			},
			create: async userId => {
				let response = await axios.post(route, { userId: userId });
				return response.data;
			},
			addItem: async (userId, itemId, quantity, size) => {
				let response = await axios.post(`${route}/add`, {
					userId: userId,
					itemId: itemId,
					quantity: quantity,
					size: size,
				});
				return response.data;
			},
			removeItem: async (userId, itemId) => {
				let response = await axios.post(`${route}/remove`, {
					userId: userId,
					itemId: itemId,
				});
				return response.data;
			},
			updateItem: async (cartItemId, attribute, value) => {
				let response = await axios.patch(`${route}`, {
					cartItemId: cartItemId,
					attribute: attribute,
					value: value,
				});
				return response.data;
			},
			clear: async userId => {
				let response = await axios.post(`${route}/clear`, {
					userId: userId,
				});
				return response.data;
			},
		};
	},
	likes(route = '/likes') {
		return {
			getItems: async userId => {
				let response = await axios.get(`${route}?userId=${userId}`);
				return response.data;
			},
			create: async userId => {
				let response = await axios.post(route, { userId: userId });
				return response.data;
			},
			addItem: async (userId, itemId) => {
				let response = await axios.post(`${route}/add`, {
					userId: userId,
					itemId: itemId,
				});
				return response.data;
			},
			removeItem: async (userId, itemId) => {
				let response = await axios.post(`${route}/remove`, {
					userId: userId,
					itemId: itemId,
				});
				return response.data;
			},
		};
	},
	order(route = '/order') {
		return {
			getHistory: async () => {
				let response = await axios.get(`${route}/history`);
				return response.data;
			},
			getItems: async userId => {
				return this.cart.getItems(userId);
			},
			create: async (userId, total) => {
				let response = await axios.post(route, {
					userId: userId,
					total: total,
				});
				return response.data;
			},
		};
	},
};
