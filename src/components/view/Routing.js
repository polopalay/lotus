import React, {Component} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Home from './home/Home';

class Routing extends Component {
	constructor(props) {
		super(props);
		this.state = {user: null};
	}
	render() {
		if (this.props.app.user === null) {
			return <div></div>;
		}
		else {
			return (
				<Switch>
					<Route key='home' exact path='/' component={Home} />
				</Switch>
			);
		}
	}
}
const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};
export default connect(mapStateToProps)(Routing);
