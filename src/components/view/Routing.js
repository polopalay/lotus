import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {onUserStateChange} from '../../firebase/auth';
import Home from './home/Home';

export default class Routing extends Component {
	constructor(props) {
		super(props);
		this.state = {user: null};
	}
	componentDidMount() {
		onUserStateChange(user => this.setState({user: user}));
	}
	render() {
		if (this.state.user === null) {
			return <div></div>;
		}
		else {
			return (
				<Switch>
					<Route exact path='/' component={Home} />
				</Switch>
			);
		}
	}
}
