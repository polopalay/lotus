import React, {Component} from "react";
import {connect} from "react-redux";
import store from '../../../store';
import {setUser} from '../../../reducers/app/app.action'
import {Tabs, Avatar, Card, Image, Col, Row, Form, Input, Button, Upload, message} from 'antd'
import {UploadOutlined} from '@ant-design/icons';
import {updateDisplayName, updatePhotoUrl, getCurrentUser} from '../../../firebase/auth'
import {uploadFile} from '../../../firebase/storage'
class Setting extends Component {
  finish = (event) => {
    console.log(event.username);
    updateDisplayName(event.username, () => {
      store.dispatch(setUser(getCurrentUser()))
      message.success('Cập nhật thành công');
    })
  }
  upLoadFile = (file) => {
    uploadFile(`/avatar/${this.props.app.user.uid}.png`, file, (rs) => {
      updatePhotoUrl(rs, () => {
        store.dispatch(setUser(getCurrentUser()))
        message.success('Cập nhật thành công');
      })
    })
  }
  render() {
    return (
      <Row justify='center'>
        <Col>
          <Tabs defaultActiveKey="1" centered>
            <Tabs.TabPane tab="Tab 1" key="1">
              <Card style={{width: 300, background: 'none'}}>
                <Form size='middle' onFinish={this.finish}>
                  <Form.Item name="username">
                    <Input />
                  </Form.Item>

                  <Form.Item wrapperCol={{offset: 3, span: 16}}>
                    <Button type="primary" htmlType="submit"> Cập nhật tên người dùng </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2">
              <Card style={{width: 300, background: 'none'}}>
                <Row justify='center'>
                  <Col>
                    <Avatar size={250} icon={<Image src={this.props.app.user.photoURL} preview={false} />} />
                    <Row className='pt-3' justify='center'>
                      <Col>
                        <Upload fileList={[]} beforeUpload={(file) => {this.upLoadFile(file); return false;}}>
                          <Button type='primary' icon={<UploadOutlined />}>Upload file</Button>
                        </Upload>
                      </Col>
                    </Row>
                  </Col>
                </Row >
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row >
    );
  }
}
const mapStateToProps = (store) => {
  return {
    app: store.app,
  };
};
export default connect(mapStateToProps)(Setting);

