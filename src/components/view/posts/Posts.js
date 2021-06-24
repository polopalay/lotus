import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col, Image, List} from 'antd';
import {DownOutlined} from "@ant-design/icons";
import Post from './Post';
import Editor from '../../layout/Editor'
import {uploadFileFromString} from '../../../firebase/storage';
import {getRow, getRowFromLast, addRow} from '../../../firebase/database'
import Output from 'editorjs-react-renderer';

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
			let data = [];
			for (let key in rs) {
				let images = []
				let post = rs[key]
				let imgs = rs[key].images
				if (imgs) {
					for (let keyImg in imgs) {
						images.push(imgs[keyImg])
					}
				}
				images.forEach(img => {
					if (images.length == 1) {
						img.size = '100%'
					} else if (images.length > 1 && images.length <= 4) {
						img.size = '50%'
					} else if (images.length > 4) {
						img.size = '33.33%'
					}
				})
				let map = {
					key: key,
					userId: post.userId,
					author: post.author,
					avatar: post.avatar,
					content: <Output data={post.content} />,
					images: images
				}
				data.unshift(map);
			}
			this.setState({posts: data})
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
		return (
			<>
				<Row justify='center' className='mb-4'>
					<Col xl={12} lg={14} md={16} sm={18} xs={20}>
						<Editor user={this.props.app.user} initValue={this.state.comment} submit={this.submit} />
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

