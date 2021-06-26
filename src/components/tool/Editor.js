import React, {Component} from "react";
import EditorJs from 'react-editor-js';
import {Comment, Card, Image, Row, Col, Carousel} from 'antd';
import {FileImageOutlined, SendOutlined} from "@ant-design/icons";

export default class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {value: {}, editor: {}, images: []}
	}
	handleChange = (event) => {
		event.saver.save().then(data => this.setState({value: data}))
	}
	reference = (editor) => {
		this.setState({editor: editor})
	}
	submit = () => {
		if (this.props.submit) {
			this.props.submit({comment: this.state.value, images: this.state.images})
			this.state.editor.clear();
			this.setState({images: []})
		}
	}
	upload = (event) => {
		if (this.state.images.length < 9) {
			let files = event.target.files
			for (let i = 0; i < files.length; i++) {
				const fileReader = new FileReader();
				fileReader.onload = this.load
				fileReader.readAsDataURL(files[i]);
			}
		}
	}
	load = (rs) => {
		if (this.state.images.length < 9) {
			let images = this.state.images;
			images.push({id: Date.now(), src: rs.target.result})
			this.setState({images: images})
		}
	}
	render() {
		const user = this.props.user
		return (
			<Card
				actions={[
					<SendOutlined key='send' onClick={this.submit} className='action-icon' />,
					<FileImageOutlined key='img' onClick={() => document.getElementById(`uploader${this.props.id}`).click()} className='action-icon' />,
				]}
			>
				<Comment author={<p className='author-name'>{user.displayName}</p>} avatar={<Image src={user.photoURL} preview={false} />} />
				<div className='editor-container border mb-2'>
					<EditorJs onChange={this.handleChange} instanceRef={this.reference} />
				</div>
				<Row justify='center'>
					<Col span={20}>
						<Image.PreviewGroup>
							<Carousel className>
								{this.state.images.map(img => <div className='cover-img'><Image width='100%' src={img.src} /></div>)}
							</Carousel>
						</Image.PreviewGroup>
					</Col>
				</Row>
				<input type="file" id={`uploader${this.props.id}`} accept="image/png, image/gif, image/jpeg" onChange={this.upload} hidden multiple />
			</Card>
		)
	}
}
