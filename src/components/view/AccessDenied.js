import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Result} from 'antd';

class AccessDenied extends Component {
	render() {
		return this.props.app.user == null ? <Result status="403" title="403" subTitle="Bạn chưa đăng nhập!" /> : <Redirect to='/' />;
	}
}
const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};
export default connect(mapStateToProps)(AccessDenied);
