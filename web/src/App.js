import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Home} />
				<Redirect to={'/'} />
			</Switch>
		</Router>
	);
}

export default App;
