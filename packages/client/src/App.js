import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import ItemProfile from './pages/ItemProfile';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile'
import Likes from './pages/Likes'

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/categories/:name' exact component={Category} />
					<Route path='/categories/:name/:item' exact component={ItemProfile} />
					<Route path='/categories/:name?orderby=:value' exact component={Category} />
					<Route path='/login' exact component={Auth} />
					<Route path ="/cart" exact component={Cart} />
					<Route path="/myprofile" exact component={UserProfile} />
					<Route path="/likes" exact component={Likes} />
					<Redirect to={'/'} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
