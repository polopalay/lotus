import React, {Component} from "react";
import {connect} from "react-redux";
import {Comment, Row, Col, Card, Popconfirm, message, List} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {getRow, addRow, deleteRow, getRowByParrentId} from '../../../services/firebase/database'
import {deleteByUrl} from '../../../services/firebase/storage';
import {mapOne, mapData} from '../../../services/helper/mapper'
import Editor from '../../tool/Editor'

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {post: {}, comments: [], loading: true}
  }
  isMount = false;
  componentDidMount() {
    let id = this.props.match.params.id
    getRow(`/posts/${id}`, rs => {
      if (rs) {
        this.setState({loading: false, post: mapOne(rs, id)})
      }
    })
    getRowByParrentId('/comments/', 'postId', id, rs => {
      this.setState({comments: mapData(rs)})
    })
  }
  submit = (data) => {
    let comment = {
      postId: this.props.match.params.id,
      userId: this.props.app.user.uid,
      author: this.props.app.user.displayName,
      avatar: this.props.app.user.photoURL,
      content: data.comment,
      date: new Date().toDateString()
    }
    addRow('/comments/', comment)
  }
  delete = () => {
    deleteRow('/posts/', this.props.data.key);
  }
  deleteComment(id, content) {
    let images = content.blocks.filter(item => item.type === 'image').map(item => item.data.file.url).filter(item => item.includes('firebasestorage.googleapis.com'));
    deleteByUrl(images);
    deleteRow(`/comments/`, id);
    message.info('Xoá thành công');
  }
  render() {
    let post = this.state.post
    let isWriter = this.props.app.user.uid === post.uid
    if (this.state.loading) {return ''}
    return (
      <Row justify="center" className='mb-4'>
        <Col xl={16} lg={18} md={20} sm={22} xs={24}>
          <Card title={<Comment author={post.author} avatar={post.avatar} datetime={post.date} />}>
            <Row>
              <Col span={24} justify="center">
                {post.content}
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={1}>
                <Editor key={post.key} id={post.key} user={this.props.app.user} submit={this.submit} />
              </Col>
            </Row>
            <Row>
              {
                <Col span={22} offset={1}>
                  {
                    this.state.comments.length > 0 &&
                    <List
                      dataSource={this.state.comments}
                      itemLayout="horizontal"
                      renderItem={props => {
                        let canDelete = isWriter || props.uid === this.props.app.user.uid
                        return <List.Item key={Math.random()}>
                          <Col span={24} justify="center">
                            <Comment author={props.author} avatar={props.avatar} content={props.content}
                              datetime={canDelete &&
                                <Popconfirm title="Bạn có muốn xoá bài viết này không?" onConfirm={() => this.deleteComment(props.key, props.rawContent)}
                                  okText="Có" cancelText="Không" >
                                  <DeleteOutlined />
                                </Popconfirm>
                              } />
                          </Col>
                        </List.Item>
                      }
                      }
                    />
                  }
                </Col>
              }
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
export default connect(mapStateToProps)(Detail);
