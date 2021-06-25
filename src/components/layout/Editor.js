import React, {Component} from "react";
import EditorJs from 'react-editor-js';
import {Comment, Card, Image, Row, Col} from 'antd';
import {FileImageOutlined, SendOutlined} from "@ant-design/icons";
import './editor.css';

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
			images.forEach(img => {
				if (images.length === 1) {
					img.size = '100%'
				} else if (images.length > 1 && images.length <= 4) {
					img.size = '50%'
				} else if (images.length > 4) {
					img.size = '33.33%'
				}
			})
			this.setState({images: images})
		}
	}
	render() {
		const user = this.props.user
		return (
			<Card
				actions={[
					<SendOutlined key='send' onClick={this.submit} />,
					<FileImageOutlined key='img' onClick={() => document.getElementById(`uploader${this.props.id}`).click()} />,
				]}
			>
				<Comment author={user.displayName} avatar={<Image src={user.photoURL} preview={false} />} />
				<div className='editor-container border mb-2'>
					<EditorJs onChange={this.handleChange} instanceRef={this.reference} />
				</div>
				<Row justify='center'>
					<Col span={12}>
						<Image.PreviewGroup>
							{
								this.state.images.map(img => <Image width={img.size} src={img.src} />)
							}
						</Image.PreviewGroup>
					</Col>
				</Row>
				<input type="file" id={`uploader${this.props.id}`} accept="image/png, image/gif, image/jpeg" onChange={this.upload} hidden />
			</Card>
		)
	}
}
