import React, {Component} from "react";
import {connect} from "react-redux";
import {Comment, Avatar, Row, Col, List, Button, Card, Image} from 'antd';
import {SettingOutlined, DeleteOutlined, EditOutlined, SendOutlined} from "@ant-design/icons";
import monk from '../../../img/monk.png';
import buddhist from '../../../img/buddhist.png'
import {demo} from '../../../firebase/database';
import Editor from '../../layout/Editor'
import Output from 'editorjs-react-renderer';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {comments: [], comment: {time: 1624457156027, blocks: [], version: "2.22.0"}}
	}
	componentDidMount() {
		demo()
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
	render() {
		let post = this.props.data
		return (
			<Row justify="center" className='mb-4'>
				<Col xl={16} lg={18} md={20} sm={22} xs={24}>
					<Card>
						<Row>
							<Col span={24} justify="center">
								<Comment author={post.author} avatar={post.avatar} content={post.content} datetime={<><SettingOutlined /></>} />
								{
									//<Row>
									//<Col span={6}>
									//<Image src={monk} />
									//</Col>
									//<Col span={6}>
									//<Image src={buddhist} />
									//</Col>
									//</Row>
								}
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

