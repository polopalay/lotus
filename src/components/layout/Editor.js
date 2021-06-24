import React, {Component} from "react";
import EditorJs from 'react-editor-js';
import {Comment, Card, Image} from 'antd';
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
				fileReader.onload = (rs) => {
					if (this.state.images.length < 9) {
						let images = this.state.images;
						images.push({id: Date.now(), src: rs.target.result})
						images.forEach(img => {
							if (images.length == 1) {
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
				fileReader.readAsDataURL(files[i]);
			}
		}
	}
	render() {
		const user = this.props.user
		return (
			<Card
				actions={[
					<SendOutlined key='send' onClick={this.submit} />,
					<FileImageOutlined key='img' onClick={() => document.getElementById('editor-uploader').click()} />,
				]}
			>
				<Comment author={user.displayName} avatar={<Image src={user.photoURL} preview={false} />} />
				<div className='editor-container border'>
					<EditorJs onChange={this.handleChange} instanceRef={this.reference} />
				</div>
				<Image.PreviewGroup>
					{
						this.state.images.map(img => <Image width={img.size} src={img.src} />)
					}
				</Image.PreviewGroup>
				<input type="file" id='editor-uploader' accept="image/png, image/gif, image/jpeg" onChange={this.upload} multiple hidden />
			</Card>
		)
	}
}
