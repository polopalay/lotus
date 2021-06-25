import React, {Component} from "react";
import {connect} from "react-redux";
import {Comment, Row, Col, List, Card, Image, Popconfirm, message} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {addRow, deleteRow} from '../../../firebase/database'
import {uploadFileFromString} from '../../../firebase/storage';
import {deleteFile} from '../../../firebase/storage';
import Editor from '../../layout/Editor'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {comments: [], comment: {time: 1624457156027, blocks: [], version: "2.22.0"}}
  }
  componentDidMount() {
  }
  submit = (data) => {
    let comment = {
      userId: this.props.app.user.uid,
      author: this.props.app.user.displayName,
      avatar: this.props.app.user.photoURL,
      content: data.comment,
    }
    let key = addRow(`/posts/${this.props.data.key}/comments/`, comment)
    data.images.forEach(img => {
      let link = `/image-comments/${img.id}.png`
      uploadFileFromString(link, img.src, (data) => addRow(`/posts/${this.props.data.key}/comments/${key}/images/`, {src: link, link: data}))
    })
  }
  delete = () => {
    let images = this.props.data.images;
    images.forEach(image => deleteFile(image.src))
    deleteRow('/posts/', this.props.data.key);
    message.info('Xoá thành công');
  }
  deleteComment(id) {
    let images = this.props.data.images;
    images.forEach(image => deleteFile(image.src))
    deleteRow(`/posts/${this.props.data.key}/comments/`, id);
    message.info('Xoá thành công');
  }
  render() {
    let post = this.props.data
    let isWriter = this.props.app.user.uid === post.uid
    return (
      <Row justify="center" className='mb-4'>
        <Col xl={16} lg={18} md={20} sm={22} xs={24}>
          <Card>
            <Row>
              <Col span={24} justify="center">
                <Comment author={post.author} avatar={post.avatar} content={post.content} datetime={
                  <>
                    {isWriter &&
                      <Popconfirm title="Bạn có muốn xoá bài viết này không?" onConfirm={this.delete} okText="Có" cancelText="Không" >
                        <DeleteOutlined />
                      </Popconfirm>
                    }
                  </>} />
                <Row justify='center'>
                  <Col span={12}>
                    <Image.PreviewGroup>
                      {post.images.map(img => <Image width={img.size} src={img.link} />)}
                    </Image.PreviewGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={1}>
                {
                  post.comments.length > 0 &&
                  <List
                    dataSource={post.comments}
                    itemLayout="horizontal"
                    renderItem={props => {
                      let canDelete = isWriter || props.uid === this.props.app.user.uid
                      return <List.Item key={Math.random()}>
                        <Col span={24} justify="center">
                          <Comment {...props} datetime={canDelete &&
                            <Popconfirm title="Bạn có muốn xoá bài viết này không?" onConfirm={() => this.deleteComment(props.key)} okText="Có" cancelText="Không" >
                              <DeleteOutlined />
                            </Popconfirm>
                          } />
                          <Row justify='center'>
                            <Col span={12}>
                              <Image.PreviewGroup>
                                {props.images.map(img => <Image width={img.size} src={img.link} />)}
                              </Image.PreviewGroup>
                            </Col>
                          </Row>
                        </Col>
                      </List.Item>
                    }}
                  />
                }
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={1}>
                <Editor key={post.key} id={post.key} user={this.props.app.user} submit={this.submit} />
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

