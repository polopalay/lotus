import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Menu, Dropdown, Badge} from 'antd';
import {BellOutlined} from "@ant-design/icons";

class Notification extends Component {
	render() {
		return (
			<Badge size="small" count={this.props.notification.length} className="mr-1">
				<Dropdown overlay={<Menu>
					{this.props.notification.map(item =>
						<Menu.Item key={`notification${item.key}`}>
							<Link to={`/detail/${item.postId}`}>{item.message}</Link>
						</Menu.Item>
					)}
				</Menu> } placement="bottomCenter" >
					<BellOutlined className='fs-3' />
				</Dropdown>
			</Badge>
		);
	}
}
//const mapStateToProps = (store) => {
//return {
//app: store.app,
//};
//};
export default Notification;
