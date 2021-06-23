import React, {Component} from "react";
import EditorJs from 'react-editor-js';
import './editor.css';

export default class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {value: {}}
	}
	handleChange = (event) => {
		if (this.props.onChange) {
			event.saver.save().then(data => this.props.onChange(data))
		}
	}
	reference = (editor) => {
		if (this.props.setEditor) {
			this.props.setEditor(editor);
		}
	}
	render() {
		return (
			<div className='editor-container border'>
				<EditorJs data={this.props.initValue} onChange={this.handleChange} instanceRef={this.reference} />
			</div>)
	}
}
