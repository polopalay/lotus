import React, {Component} from "react";
import {connect} from "react-redux";
import {Comment, Avatar, Row, Col, List, Button, Card, Image} from 'antd';
import {DeleteOutlined, FileImageOutlined, SendOutlined} from "@ant-design/icons";
import Post from './Post';
import Editor from '../../layout/Editor'
import monk from '../../../img/monk.png';
import Output from 'editorjs-react-renderer';

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {comment: {}, editor: {}}
	}
	submit = () => {
		console.log(this.props.app.user)
		console.log(
			{
				userId: this.props.app.user.uid,
				author: this.props.app.user.displayName,
				avatar: this.props.app.user.photoURL,
				content: this.state.comment,
			}
		);
	}
	handleChange = (data) => {
		this.setState({comment: data})
	}
	render() {
		return (
			<>
				<Row justify='center' className='mb-4'>
					<Col xl={12} lg={14} md={16} sm={18} xs={20}>
						<Card
							actions={[
								<SendOutlined key='send' onClick={this.submit} />,
								<FileImageOutlined key='img' />,
							]}
						>
							<Comment author={this.props.app.user.displayName} avatar={<Image src={this.props.app.user.photoURL} />} />
							<Editor onChange={this.handleChange} initValue={this.state.comment} setEditor={(editor) => this.setState({editor: editor})} />
						</Card>
					</Col>
				</Row>
				<Post />
				<Post />
			</>);
	}
}

const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};
export default connect(mapStateToProps)(Posts);

