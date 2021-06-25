import './App.css';
import 'antd/dist/antd.css';
import React, {Component} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import {onUserStateChange} from './firebase/auth'
import {setUser} from './reducers/app/app.action'
import {Provider} from "react-redux";
import {Layout, BackTop} from 'antd';
import Header from './components/layout/Header';
import Protected from './components/view/Protected'
import Login from './components/view/user/Login'
import Logout from './components/view/user/Logout'
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
				<BackTop>Up</BackTop>
				<HashRouter>
					<Layout className="app">
						<Layout.Header className="px-3" style={{backgroundColor: "white"}}>
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
					</Layout>
				</HashRouter>
			</Provider>);
	}
}

export default App;
