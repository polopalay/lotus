import React, {Component} from "react";
import {Comment, Avatar, Row, Col, List, Button, Card, Image} from 'antd';
import {SettingOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import monk from '../../../img/monk.png';
import buddhist from '../../../img/buddhist.png'
import {demo} from '../../../firebase/database';
import Editor from '../../layout/Editor'
import Output from 'editorjs-react-renderer';

export default class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {comments: [], comment: {}, editor: {}}
	}
	componentDidMount() {
		demo()
	}
	submit = () => {
		this.setState({
			comments: [
				...this.state.comments,
				{
					key: Math.random(),
					author: 'MacKeNo',
					avatar: monk,
					content: <Output data={this.state.comment} />,
					datetime: [<DeleteOutlined />]
				}
			], comment: {}
		});
		this.state.editor.clear();
	}
	handleChange = (data) => {
		this.setState({comment: data})
	}
	render() {
		return (
			<Row justify="center">
				<Col xl={16} lg={18} md={20} sm={22} xs={24}>
					<Card>
						<Row>
							<Col span={24} justify="center">
								<Comment author='MacKeNo' avatar={buddhist} content={<p>Some thing</p>} datetime={<><EditOutlined /> <SettingOutlined /></>} />
								<Row>
									<Col span={6}>
										<Image src={monk} />
									</Col>
									<Col span={6}>
										<Image src={buddhist} />
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
								<Comment avatar={<Avatar src={monk} alt="user" />}
									content={
										<Row justify='space-around'>
											<Col span={20}>
												<Editor onChange={this.handleChange} initValue={this.state.comment} setEditor={(editor) => this.setState({editor: editor})} />
											</Col>
											<Col span={4}>
												<Button type="primary" onClick={this.submit} >Đăng</Button>
											</Col>
										</Row>
									}
								/>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		);
	}
}
