import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {Home, Category, ItemProfile, Auth, Cart, UserProfile,Likes,Checkout} from './pages/index'


function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/categories/:name' exact component={Category} />
					<Route path='/categories/:name/:item' exact component={ItemProfile} />
					<Route path='/categories/:name?orderby=:value' exact component={Category} />
					<Route path ="/cart" exact component={Cart} />
					<Route path="/myprofile" exact component={UserProfile} />
					<Route path="/likes" exact component={Likes} />
					<Route path="/checkout" exact component={Checkout} />
					<Redirect to={'/'} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
