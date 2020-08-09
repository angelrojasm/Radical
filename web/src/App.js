import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Footer from './Components/Footer';

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/categories/:name' exact component={Category} />
					<Route path='/categories/:name?order=:value' exact component={Category} />
					<Redirect to={'/'} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
