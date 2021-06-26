import Output from 'editorjs-react-renderer';
import {Link} from 'react-router-dom'
import {Image, Avatar} from 'antd'

export function mapOne(item, key) {
	let images = []
	let imgs = item.images
	if (imgs) {
		for (let keyImg in imgs) {
			let img = imgs[keyImg];
			img.id = keyImg;
			images.push(img)
		}
	}
	return {
		key: key,
		uid: item.userId,
		date: item.date,
		author: item.author,
		avatar: <Link to={`/user/${item.userId}`}><Avatar icon={<Image src={item.avatar} preview={false} />} /></Link>,
		content: <Output data={item.content} />,
		images: images,
	}
}
export function mapData(data) {
	let dataset = []
	for (let key in data) {
		if (data[key]) {
			let map = mapOne(data[key], key);
			dataset.unshift(map);
		}
	}
	return dataset;
}

