import './App.css';
import 'antd/dist/antd.css';
import React, {Component} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import {onUserStateChange} from './firebase/auth'
import {setUser} from './reducers/app/app.action'
import {Provider} from "react-redux";
import {Layout} from 'antd';
import Header from './components/header/Header';
import Footer from './components/footer/Footer'
import Protected from './components/view/Protected'
import Login from './components/authentication/Login'
import Logout from './components/authentication/Logout'
import AccessDenied from './components/view/AccessDenied'
import store from './store';

class App extends Component {
	constructor(props) {
		super(props);
		onUserStateChange(user => {
			store.dispatch(setUser(user))
		});
	}
	render() {
		return (
			<Provider store={store}>
				<HashRouter>
					<Layout className="app">
						<Layout.Header style={{backgroundColor: "white"}}>
							<Header />
						</Layout.Header>
						<Layout.Content className="p-3">
							<Switch>
								<Route exact path='/login' component={Login} />
								<Route exact path='/logout' component={Logout} />
								<Route exact path='/acessDenied' component={AccessDenied} />
								<Route path="/" component={Protected} />
							</Switch>
						</Layout.Content>
						<Layout.Footer style={{textAlign: 'center'}}>
							<Footer />
						</Layout.Footer>
					</Layout>
				</HashRouter>
			</Provider>);
	}
}

export default App;
