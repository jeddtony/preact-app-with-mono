import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';
import Jed from '../routes/jed';
import HiPage from '../components/page/HiPage'
import SecondJed from '../routes/jed/SecondJed'
import Login from '../routes/login'

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				{/* <Header /> */}
				<Router onChange={this.handleRoute}>
				<Jed path="/jed" user="jed" />
				<SecondJed path="/second/jed" user="jed" />
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Login path="/login" />
					<HiPage path="/hipage" user="jed"/>
				</Router>
			</div>
		);
	}
}
