import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Menu, Dropdown, Badge} from 'antd';
import {BellOutlined} from "@ant-design/icons";
import {getChild} from '../../services/firebase/database'

class Notification extends Component {
	constructor(props) {
		super(props);
		this.state = {notification: []}
	}
	componentDidMount() {
		this.getData()
	}
	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps)
		console.log(this.props)
		if (prevProps.app.user.uid !== this.props.app.user.uid) {
			this.getData();
		}
	}
	getData = () => {
		if (this.props.app.user.uid) {
			getChild(`/notification/`, this.props.app.user.uid, data => {
				console.log(data)
				if (data) {
					console.log(data);
					let noti = [];
					for (let key in data) {
						let mss = data[key]
						mss.key = key
						noti.push(mss);
					}
					this.setState({notification: noti})
				}
			})
		}
	}
	render() {
		const menu = (
			<Menu>
				{this.state.notification.map(item =>
					<Menu.Item key={`notification${item.key}`}>
						<Link to={`/detail/${item.postId}`}>{item.message}</Link>
					</Menu.Item>
				)}
			</Menu>
		);
		return (
			<Badge size="small" count={this.state.notification.length} className="mr-1" >
				<Dropdown overlay={menu} placement="bottomCenter" >
					<BellOutlined className='fs-3' />
				</Dropdown>
			</Badge>
		);
	}
}
const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};
export default connect(mapStateToProps)(Notification);
