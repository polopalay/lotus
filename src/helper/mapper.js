import Output from 'editorjs-react-renderer';
import {Link} from 'react-router-dom'
import {Image, Avatar} from 'antd'

export function mapData(data) {
	let dataset = []
	for (let key in data) {
		let item = data[key];
		let images = []
		let imgs = data[key].images
		if (imgs) {
			for (let keyImg in imgs) {
				let img = imgs[keyImg];
				img.id = keyImg;
				images.push(img)
			}
		}
		images.forEach(img => {
			if (images.length === 1) {
				img.size = '100%'
			} else if (images.length > 1 && images.length <= 4) {
				img.size = '50%'
			} else if (images.length > 4) {
				img.size = '33.33%'
			}
		})
		let map = {
			key: key,
			uid: item.userId,
			author: item.author,
			avatar: <Link to={`/user/${item.userId}`}><Avatar icon={<Image src={item.avatar} preview={false} />} /></Link>,
			content: <Output data={item.content} />,
			images: images
		}
		dataset.unshift(map);
	}
	return dataset;
}

