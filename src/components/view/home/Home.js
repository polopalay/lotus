import React, {Component} from "react";
import Posts from "../posts/Posts"

export default class Home extends Component {
	render() {
		return (
			<Posts key={Date.now()} />
		);
	}
}
