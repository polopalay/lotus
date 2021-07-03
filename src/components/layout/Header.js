import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Menu, PageHeader, Dropdown, Avatar, Image, Typography} from 'antd';
import {SettingOutlined, LogoutOutlined, LoginOutlined, HomeOutlined, BellOutlined} from "@ant-design/icons";
import lotus from '../../services/img/lotus.png'
import userImg from '../../services/img/user.png'

class Header extends Component {
  render() {
    let avatar = userImg;
    let username;
    if (this.props.app.user) {
      avatar = this.props.app.user.photoURL;
      username = this.props.app.user.displayName
    }

    const menu = (
      <Menu>
        {this.props.app.user ?
          <>
            <Menu.Item icon={<HomeOutlined />} key="menu-home">
              <Link to={`/user/${this.props.app.user.uid}`}>Trang cá nhân</Link>
            </Menu.Item>
            <Menu.Item icon={<SettingOutlined />} key="menu-setting">
              <Link to='/setting'>Cài Đặt</Link>
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} key="menu-logout">
              <Link to='/logout'>Đăng xuất</Link>
            </Menu.Item>
          </>
          :
          <Menu.Item icon={<LoginOutlined />} key="menu-login">
            <Link to='/login'>Đăng nhập</Link>
          </Menu.Item>
        }
      </Menu>
    );
    const dropdown1 = (
      <Dropdown overlay={menu} placement="bottomCenter" key="avatar">
        <Avatar shape="square" size={45} icon={<Image src={avatar} preview={false} />} />
      </Dropdown>
    );
    const dropdown2 = <Typography.Text strong key='username'>{username}</Typography.Text>;
    const notification = (
      <Dropdown overlay={
        <Menu>
          {this.props.app.notification.map(item =>
            <Menu.Item key={`notification${item.key}`}>
              <Link to={`/detail/${item.postId}`}>{item.message}</Link>
            </Menu.Item>
          )}
        </Menu>
      } placement="bottomCenter" key='notification'>
        <BellOutlined className='fs-3 pt-2' />
      </Dropdown>
    )

    return (
      <PageHeader className="p-0 my-0" title={<Image width={45} height={45} src={lotus} preview={false} />}
        subTitle={<Typography.Text key='home' strong><Link className='text-volcano' to='/'>Home</Link></Typography.Text>}
        extra={[notification, dropdown2, dropdown1]} />
    );
  }
}
const mapStateToProps = (store) => {
  return {
    app: store.app,
  };
};
export default connect(mapStateToProps)(Header);

