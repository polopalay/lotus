import React, {Component} from "react";
import EditorJs from 'react-editor-js';

export default class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {value: {}}
	}
	handleChange = (event) => {
		event.saver.save().then(data => this.props.onChange(data))
	}
	render() {
		console.log(this.props)
		return (
			<div className='editor-container border'>
				<EditorJs data={this.props.initValue} onChange={this.handleChange} instanceRef={editor => this.props.setEditor(editor)} />
			</div>)
	}
}
