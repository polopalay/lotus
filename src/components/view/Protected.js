import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import NotFound from './NotFound';
import Posts from './posts/Posts'

class Routing extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props.app.user)
		return this.props.app.user==null? <Redirect to="/acessDenied" />:<Switch>
			<Route exact path='/' component={Posts} />
			<Route component={NotFound} />
		</Switch>
	}
}
const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};
export default connect(mapStateToProps)(Routing);
