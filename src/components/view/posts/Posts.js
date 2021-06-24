import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col, List} from 'antd';
import {DownOutlined} from "@ant-design/icons";
import Post from './Post';
import Editor from '../../layout/Editor'
import {uploadFileFromString} from '../../../firebase/storage';
import {getRowFromLast, addRow} from '../../../firebase/database'
import {mapData} from '../../../helper/mapper'

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {posts: [], number: 5}
	}
	componentDidMount() {
		this.load()
	}
	loadMore = () => {
		this.setState({number: this.state.number + 1})
		this.load();
	}
	load() {
		getRowFromLast('/posts/', this.state.number, rs => {
			let dataset = mapData(rs);
			dataset.forEach(item => item.comments = mapData(rs[item.key].comments))
			this.setState({posts: dataset})
		})
	}
	submit = (data) => {
		let post =
		{
			userId: this.props.app.user.uid,
			author: this.props.app.user.displayName,
			avatar: this.props.app.user.photoURL,
			content: data.comment,
		}
		let key = addRow('/posts/', post)
		data.images.forEach(img => {
			let link = `/image-posts/${img.id}.png`
			uploadFileFromString(link, img.src, (data) => addRow(`/posts/${key}/images/`, {src: link, link: data}))
		})
	}
	render() {
		console.log(this.props)
		return (
			<>
				<Row justify='center' className='mb-4'>
					<Col xl={12} lg={14} md={16} sm={18} xs={20}>
						<Editor key={Math.random()} user={this.props.app.user} initValue={this.state.comment} submit={this.submit} />
					</Col>
				</Row>
				<List dataSource={this.state.posts}
					loadMore={<Row align='center'><Col><DownOutlined onClick={this.loadMore} /></Col></Row>}
					renderItem={item => <Post key={item.key} data={item} />} />
			</>);
	}
}

const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};
export default connect(mapStateToProps)(Posts);

