import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
	Home,
	Category,
	ItemProfile,
	Auth,
	Cart,
	UserProfile,
	Likes,
	Checkout,
	AdminPanel,
	Personalized,
} from './pages/index';
import { useAuth0 } from '@auth0/auth0-react';
import api from './api/api';
import Testing from './Testing';
import db from './localdb';
import './scss/App.scss';
function App() {
	const { user, isAuthenticated } = useAuth0();

	useEffect(() => {
		if (!isAuthenticated) {
			if (db.isNew()) {
				db.createTable('cartItem', ['itemId', 'quantity', 'size']);
				db.commit();
			}
		}
	}, []);
	useEffect(() => {
		async function getdata() {
			if (isAuthenticated) {
				let userId = user.sub.split('|')[1];
				let response = await api.user().get(userId);

				if (response.error) {
					var firstName = '';
					var lastName = '';

					if (user.given_name != undefined && user.family_name != undefined) {
						firstName = user.given_name;
						lastName = user.family_name;
					}
					api.user().create(userId, user.email, firstName, lastName);
					api.cart().create(userId);
					api.likes().create(userId);
				}
			}
		}
		getdata();
	}, [user]);
	return (
		<>
			<Router>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/categories/:name' exact component={Category} />
					<Route path='/categories/:name/:item' exact component={ItemProfile} />
					<Route path='/categories/:name?orderby=:value' exact component={Category} />
					<Route path='/cart' exact component={Cart} />
					<Route path='/myprofile' exact component={UserProfile} />
					<Route path='/likes' exact component={Likes} />
					<Route path='/checkout' exact component={Checkout} />
					<Route path='/admin/panel' exact component={AdminPanel} />
					<Route path='/Personalized' exact component={Personalized} />
					<Redirect to={'/'} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
