import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Menu, PageHeader, Dropdown, Avatar, Image, Typography} from 'antd';
import {SettingOutlined, LogoutOutlined, LoginOutlined} from "@ant-design/icons";
import lotus from '../../img/lotus.png'
import userImg from '../../img/user.png'

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
            <Menu.Item icon={<SettingOutlined />} key="menu-setting">
              <Link to='/setting'>Cài Đặt</Link>
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} key="menu-logout">
              <Link to='/logout'>Đăng xuất</Link>
            </Menu.Item>
          </>
          :
          <Menu.Item icon={<LoginOutlined />} key="menu-setting">
            <Link to='/login'>Đăng nhập</Link>
          </Menu.Item>
        }
      </Menu>
    );
    const dropdown = (
      <Dropdown overlay={menu} placement="topRight" key="header-dropdown">
        <Avatar
          className="dropdown-toggle mt-2"
          shape="square"
          size={45}
          icon={<Image src={avatar} preview={false} />}
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
      </Dropdown>
    );
    return (
      <PageHeader className="p-0 m-0" title={<Image width={45} height={45} src={lotus} preview={false} />}
        subTitle={<Typography.Text strong><Link style={{color: '#ff4d4f'}} to='/'>Home</Link></Typography.Text>}
        extra={[<Typography.Text strong>{username}</Typography.Text>,
          dropdown]} />
    );
  }
}
const mapStateToProps = (store) => {
  return {
    app: store.app,
  };
};
export default connect(mapStateToProps)(Header);

