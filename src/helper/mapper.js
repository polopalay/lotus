import Output from 'editorjs-react-renderer';
import {Link} from 'react-router-dom'
import {Image, Avatar} from 'antd'

export function mapOne(item, key) {
	let likes = []
	let lks = item.likes;
	if (lks) {
		for (let keyLike in lks) {
			likes.push(lks[keyLike].uid);
		}
	}
	return {
		key: key,
		uid: item.userId,
		date: item.date,
		author: item.author,
		avatar: <Link to={`/user/${item.userId}`}><Avatar icon={<Image src={item.avatar} preview={false} />} /></Link>,
		content: <Output data={item.content} />,
		rawContent: item.content,
		likes: likes
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

export function toBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	})
};

