import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Comment, Row, Col, Card, Image, Popconfirm, message} from 'antd';
import {DeleteOutlined, CommentOutlined, FireOutlined} from "@ant-design/icons";
import {getRowByParrentId, deleteRow} from '../../../firebase/database'
import {deleteFile} from '../../../firebase/storage';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {comments: [], comment: {time: 1624457156027, blocks: [], version: "2.22.0"}}
  }
  delete = () => {
    let parrentId = this.props.data.key
    deleteRow('/posts/', parrentId, () => {
      let images = this.props.data.images;
      images.forEach(image => deleteFile(image.src))
      getRowByParrentId('/comments/', 'postId', parrentId, rs => {
        for (let key in rs) {
          deleteRow('/comments/', key)
        }
      })
      this.props.load()
      message.info('Xoá thành công');
    });
  }
  render() {
    let post = this.props.data
    let isWriter = this.props.app.user.uid === post.uid
    return (
      <Row justify="center" className='mb-4'>
        <Col xl={10} lg={14} md={18} sm={22} xs={24}>
          <Card actions={[]}>
            <Row>
              <Col span={24} justify="center">
                <Comment author={<p className='author-name'>{post.author}</p>} avatar={post.avatar}
                  content={post.content} datetime={post.date} actions={[
                    <FireOutlined className='action-icon' />,
                    <Link to={`/detail/${post.key}`}><CommentOutlined className='action-icon' /></Link>,
                    <>
                      {isWriter &&
                        <Popconfirm title="Bạn có muốn xoá bài viết này không?" onConfirm={this.delete} okText="Có" cancelText="Không" >
                          <DeleteOutlined className='action-icon' />
                        </Popconfirm>
                      }
                    </>,
                  ]} />
                <Row justify='center'>
                  <Col span={12}>
                    <Image.PreviewGroup>
                      {post.images.map(img => <Image width={img.size} src={img.link} />)}
                    </Image.PreviewGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    app: store.app,
  };
};
export default connect(mapStateToProps)(Post);

