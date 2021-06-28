import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import ListTool from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';

export function editorTools(uploadByFile, uploadByUrl) {
    return {
        delimiter: Delimiter,
        paragraph: {class: Paragraph, inlineToolbar: true},
        quote: {class: Quote, inlineToolbar: true},
        marker: Marker,
        inlineCode: InlineCode,
        list: {class: ListTool, inlineToolbar: true},
        image: {
            class: ImageTool,
            config: {uploader: {uploadByFile: uploadByFile, uploadByUrl: uploadByUrl}}
        },
    }
}
