import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col, List} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Post from "./Post";
import Editor from "../../tool/Editor";
import {uploadFileFromString} from "../../../firebase/storage";
import {addRow, getRowFromLastOneTime, getRowByParrentIdFromLastOneTime} from "../../../firebase/database";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], number: 5};
  }
  componentDidMount() {
    this.load();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.uid !== this.props.match.params.uid) {
      this.load();
    }
  }
  loadMore = () => {
    this.setState({number: this.state.number + 5});
    this.load();
  };
  load = () => {
    if (this.props.match.params.uid) {
      getRowByParrentIdFromLastOneTime("/posts/", this.state.number, 'userId', this.props.match.params.uid, (rs) => {
        this.setState({posts: this.posts(rs)})
      });
    } else {
      getRowFromLastOneTime("/posts/", this.state.number, (rs) => {
        this.setState({posts: this.posts(rs)})
      });
    }
  }
  posts = (data) => {
    let keys = []
    for (let key in data) {
      keys.unshift(key)
    }
    return keys;
  }
  submit = (data) => {
    let post = {
      userId: this.props.app.user.uid,
      author: this.props.app.user.displayName,
      avatar: this.props.app.user.photoURL,
      content: data.comment,
      date: new Date().toDateString()
    };
    let key = addRow("/posts/", post, () => {
      this.load();
      data.images.forEach((img) => {
        let link = `/image-posts/${img.id}.png`;
        uploadFileFromString(link, img.src, (data) => {
          addRow(`/posts/${key}/images/`, {src: link, link: data})
          this.load();
        }
        );
      });
    });
  };
  render() {
    return (
      <>
        <Row justify="center" className="mb-4">
          <Col xl={10} lg={14} md={18} sm={22} xs={24}>
            <Editor key={Math.random()} user={this.props.app.user} initValue={this.state.comment} submit={this.submit} />
          </Col>
        </Row>
        <List
          dataSource={this.state.posts}
          loadMore={<Row align="center"><Col><DownOutlined onClick={this.loadMore} /></Col></Row>}
          renderItem={(item) => <Post key={item} data={item} load={this.load} />}
        />
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    app: store.app,
  };
};
export default connect(mapStateToProps)(Posts);
