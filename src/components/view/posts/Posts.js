import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col, Image} from 'antd';
import Post from './Post';
import Editor from '../../layout/Editor'
import {uploadFileFromString} from '../../../firebase/storage';
import {getRow, addRow} from '../../../firebase/database'
import Output from 'editorjs-react-renderer';

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {posts: []}
	}
	componentDidMount() {
		getRow('/posts/', rs => {
			let data = [];
			for (let key in rs) {
				console.log(rs);
				let map = {
					key: key,
					author: rs[key].author,
					avatar: rs[key].avatar,
					content: <Output data={rs[key].content} />,
				}
				data.push(map);
			}
			this.setState({posts: data})
		})
	}
	submit = (data) => {
		//console.log(data.images);
		//data.images.forEach(img => {
		//uploadFileFromString(`/image/${img.id}.png`, img.src, (data) => console.log(data))
		//})
		let post =
		{
			userId: this.props.app.user.uid,
			author: this.props.app.user.displayName,
			avatar: this.props.app.user.photoURL,
			content: data.comment,
			images: data.images
		}
		addRow('/posts/', post)
	}
	render() {
		return (
			<>
				<Row justify='center' className='mb-4'>
					<Col xl={12} lg={14} md={16} sm={18} xs={20}>
						<Editor user={this.props.app.user} initValue={this.state.comment} submit={this.submit} />
					</Col>
				</Row>
				{this.state.posts.map(item =>
					<Post key={item.key} data={item} />
				)}
			</>);
	}
}

const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};
export default connect(mapStateToProps)(Posts);

