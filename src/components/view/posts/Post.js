import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Comment, Row, Col, Card, Image, Popconfirm, Carousel, message} from 'antd';
import {DeleteOutlined, CommentOutlined, CaretUpOutlined, LoadingOutlined} from "@ant-design/icons";
import {getRowByParrentId, getRowByParrentIdOneTime, getRow, deleteRow, addRow} from '../../../firebase/database'
import {deleteFile} from '../../../firebase/storage';
import {mapOne} from '../../../helper/mapper'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {comments: [], post: {}, loading: true}
  }
  componentDidMount() {
    getRow(`/posts/${this.props.data}`, rs => {
      if (rs) {
        this.setState({post: mapOne(rs, this.props.data), loading: false});
      }
    })
  }
  delete = () => {
    let parrentId = this.props.data
    deleteRow('/posts/', parrentId, () => {
      let images = this.state.post.images;
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
  vote = (post) => {
    getRowByParrentIdOneTime(`/posts/${post.key}/likes`, 'uid', this.props.app.user.uid, rs => {
      if (rs) {
        for (let key in rs) {
          deleteRow(`/posts/${post.key}/likes`, key, null)
        }
      } else {
        addRow(`/posts/${post.key}/likes`, {uid: this.props.app.user.uid}, null);
      }
    })
  }
  render() {
    let post = this.state.post
    if (!this.state.loading) {
      if (post) {
        let uid = this.props.app.user.uid
        let isWriter = uid === post.uid
        let liked = post.likes.includes(uid)
        return (
          <Row justify="center" className='mb-4'>
            <Col xl={10} lg={14} md={18} sm={22} xs={24}>
              <Card actions={[]}>
                <Row>
                  <Col span={24} justify="center">
                    <Comment author={<p className='author-name'>{post.author}</p>} avatar={post.avatar}
                      content={
                        <>
                          {post.content}
                          <Image.PreviewGroup>
                            <Carousel className>
                              {post.images.map(img => <div className='cover-img'><Image width='100%' src={img.link} /></div>)}
                            </Carousel>
                          </Image.PreviewGroup>
                        </>
                      } datetime={post.date} actions={[
                        <CaretUpOutlined className={`action-icon ${liked && "text-volcano"}`} onClick={() => this.vote(post)} />,
                        <Link to={`/detail/${post.key}`}><CommentOutlined className='action-icon text-mute' /></Link>,
                        <>
                          {isWriter &&
                            <Popconfirm title="Bạn có muốn xoá bài viết này không?" onConfirm={this.delete} okText="Có" cancelText="Không" >
                              <DeleteOutlined className='action-icon' />
                            </Popconfirm>
                          }
                        </>,
                      ]} />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        );
      } else {
        return '';
      }
    } else {
      return <LoadingOutlined />;
    }
  }
}
const mapStateToProps = (store) => {
  return {
    app: store.app,
  };
};
export default connect(mapStateToProps)(Post);

