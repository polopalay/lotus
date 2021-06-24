import {Component} from "react";
import {loginWithGoogle} from '../../firebase/auth';

export default class Login extends Component {
	constructor(props) {
		super(props);
		loginWithGoogle(() => this.props.history.push('/'));
	}
	render() {
		return '';
	}
}
