import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export default {
	user(route = '/user') {
		return {
			get: async userId => {
				let response = await fetch(`${API_URL}${route}?userId=${userId}`);
				let data = await response.json();
				return data;
			},
			create: async (userId, email, firstName, lastName) => {
				let response = await fetch(`${API_URL}${route}`, {
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
				let response = await fetch(`${API_URL}${route}`, {
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
				let response = await fetch(`${API_URL}${route}`);
				let data = await response.json();
				return data;
			},
			getItem: async itemId => {
				let response = await fetch(`${API_URL}${route}/find?itemId=${itemId}`);
				let data = await response.json();
				return data;
			},
			create: async form => {
				let data = axios
					.post(`${API_URL}${route}`, form)
					.then(function (response) {
						return response.data;
					})
					.catch(function (error) {
						return error;
					});
				return data;
			},
			addDesign: async form => {
				let response = await axios.post(`${API_URL}${route}/add-design`, form);
				return response.data;
			},
			deleteDesign: async fileName => {
				let response = await axios.post(`${API_URL}${route}/delete-design`, {
					fileName: fileName,
				});
				return response.data;
			},
		};
	},
	cart(route = '/cart') {
		return {
			getItems: async userId => {
				let response = await axios.get(`${API_URL}${route}?userId=${userId}`);
				return response.data;
			},
			create: async userId => {
				let response = await axios.post(`${API_URL}${route}`, { userId: userId });
				return response.data;
			},
			addItem: async form => {
				let response = await axios.post(`${API_URL}${route}/add`, form);
				return response.data;
			},
			removeItem: async (userId, itemId) => {
				let response = await axios.post(`${API_URL}${route}/remove`, {
					userId: userId,
					itemId: itemId,
				});
				return response.data;
			},
			updateItem: async (cartItemId, attribute, value) => {
				let response = await axios.patch(`${API_URL}${route}`, {
					cartItemId: cartItemId,
					attribute: attribute,
					value: value,
				});
				return response.data;
			},
			clear: async userId => {
				let response = await axios.post(`${API_URL}${route}/clear`, {
					userId: userId,
				});
				return response.data;
			},
		};
	},
	likes(route = '/likes') {
		return {
			getItems: async userId => {
				let response = await axios.get(`${API_URL}${route}?userId=${userId}`);
				return response.data;
			},
			create: async userId => {
				let response = await axios.post(`${API_URL}${route}`, { userId: userId });
				return response.data;
			},
			addItem: async (userId, itemId) => {
				let response = await axios.post(`${API_URL}${route}/add`, {
					userId: userId,
					itemId: itemId,
				});
				return response.data;
			},
			removeItem: async (userId, itemId) => {
				let response = await axios.post(`${API_URL}${route}/remove`, {
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
				let response = await axios.get(`${API_URL}${route}/history`);
				return response.data;
			},
			getItems: async userId => {
				return this.cart.getItems(userId);
			},
			create: async formData => {
				let response = await axios.post(`${API_URL}${route}`, formData);
				return response.data;
			},
		};
	},
	admin(route = '/admin') {
		return {
			isAdmin: async email => {
				let response = await axios.get(`${API_URL}${route}/verify?email=${email}`);
				return response.data;
			},
			create: async email => {
				let response = await axios.post(`${API_URL}${route}`, { email: email });
				return response.data;
			},
		};
	},
};
