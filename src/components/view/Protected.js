import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Posts from './posts/Posts'
import Detail from './posts/Detail'
import Setting from './user/Setting'

class Routing extends Component {
	render() {
		return this.props.app.user == null ? <Redirect to="/acessDenied" /> : <Switch>
			<Route exact path='/' component={Posts} />
			<Route exact path='/user/:uid' component={Posts} />
			<Route exact path='/detail/:id' component={Detail} />
			<Route exact path='/setting' component={Setting} />
		</Switch>
	}
}
const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};
export default connect(mapStateToProps)(Routing);
