import React, { useState, useEffect } from 'react';
import { HashRouter as Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import ItemProfile from './pages/ItemProfile';
import Auth from './pages/Auth';

function App() {
	return (
		<>
			<HashRouter>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/categories/:name' exact component={Category} />
					<Route path='/categories/:name/:item' exact component={ItemProfile} />
					<Route path='/categories/:name?orderby=:value' exact component={Category} />
					<Route path='/login' exact component={Auth} />
					<Redirect to={'/'} />
				</Switch>
			</HashRouter>
		</>
	);
}

export default App;
