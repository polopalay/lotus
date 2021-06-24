import React, {Component} from "react";
import {connect} from "react-redux";
import {Comment, Avatar, Row, Col, List, Card, Image, message} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import monk from '../../../img/monk.png';
import {deleteRow} from '../../../firebase/database';
import {deleteFile} from '../../../firebase/storage';
import Editor from '../../layout/Editor'
import Output from 'editorjs-react-renderer';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {comments: [], comment: {time: 1624457156027, blocks: [], version: "2.22.0"}}
	}
	componentDidMount() {
	}
	submit = (data) => {
		this.setState({
			comments: [
				...this.state.comments,
				{
					key: Math.random(),
					author: 'MacKeNo',
					avatar: monk,
					content: <Output data={data.comment} />,
					datetime: [<DeleteOutlined />]
				}
			], comment: {}
		});
	}
	delete = () => {
		let images = this.props.data.images;
		images.forEach(image => deleteFile(image.src))
		deleteRow('/posts/', this.props.data.key);
		message.info('Xoá thành công');
	}
	render() {
		let post = this.props.data
		let isWriter = this.props.app.user.uid === post.userId
		return (
			<Row justify="center" className='mb-4'>
				<Col xl={16} lg={18} md={20} sm={22} xs={24}>
					<Card>
						<Row>
							<Col span={24} justify="center">
								<Comment author={post.author} avatar={post.avatar} content={post.content} datetime={
									<>{isWriter && <DeleteOutlined onClick={this.delete} />}</>} />
								<Row justify='center'>
									<Col span={12}>
										<Image.PreviewGroup>
											{
												post.images.map(img => <Image width={img.size} src={img.link} />)
											}
										</Image.PreviewGroup>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col span={22} offset={1}>
								{
									this, this.state.comments.length > 0 &&
									<List
										dataSource={this.state.comments}
										itemLayout="horizontal"
										renderItem={props => <List.Item key={props.key}><Comment {...props} /></List.Item>}
									/>
								}
							</Col>
						</Row>
						<Row>
							<Col span={22} offset={1}>
								<Editor user={this.props.app.user} initValue={this.state.comment} submit={this.submit} />
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		);
	}
}
const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};
export default connect(mapStateToProps)(Post);

