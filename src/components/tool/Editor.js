import React, {Component} from "react";
import EditorJs from 'react-editor-js';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import ListTool from '@editorjs/list';
import Delimiter from '@editorjs/delimiter'
import {Comment, Card, Image} from 'antd';
import {uploadFileFromStringAsync} from '../../firebase/storage';
import {ClearOutlined, SendOutlined} from "@ant-design/icons";
import {toBase64} from '../../helper/mapper';

export default class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {editor: null, mounted: false}
		this.uploadByFile = this.uploadByFile.bind(this);
		this.submit = this.submit.bind(this);
	}
	componentDidMount() {
		this.setState({mounted: true})
	}
	async submit() {
		if (this.props.submit) {
			const content = await this.state.editor.save()
			const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
			const blocks = content.blocks.filter(block => block.type === 'image')
			for (let i = 0; i < blocks.length; i++) {
				const block = blocks[i];
				if (base64regex.test(block.data.file.url.replace(/^data:image\/[a-z]+;base64,/, ""))) {
					const rs = await uploadFileFromStringAsync(`/images/${Date.now()}`, block.data.file.url);
					block.data.file.url = rs.url
				}
			}
			this.props.submit({comment: content})
			this.state.editor.clear();
		}
	}
	async uploadByFile(file) {
		let data = await toBase64(file);
		return {
			success: 1,
			file: {
				url: data
			}
		}
	}
	async uploadByUrl(url) {
		return {
			success: 1,
			file: {
				url: url
			}
		}
	}
	render() {
		const user = this.props.user;
		const tools = {
			delimiter: Delimiter,
			paragraph: {class: Paragraph, inlineToolbar: true},
			quote: Quote,
			marker: Marker,
			inlineCode: InlineCode,
			list: ListTool,
			image: {
				class: ImageTool,
				config: {uploader: {uploadByFile: this.uploadByFile, uploadByUrl: this.uploadByUrl}}
			}
		}
		return (
			<Card
				actions={[
					<SendOutlined key='send' onClick={this.submit} className='action-icon' />,
					<ClearOutlined key='img' className='action-icon' onClick={() => this.state.editor.clear()} />,
				]}
			>
				<Comment author={<p className='author-name'>{user.displayName}</p>} avatar={<Image src={user.photoURL} preview={false} />} />
				<div className='editor-container border mb-2'>
					<EditorJs onChange={this.handleChange} tools={tools} logLevel='INFO' onReady={editor => this.state.mounted && this.setState({editor: editor})} />
				</div>
			</Card>
		)
	}
}
