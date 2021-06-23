import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Menu, PageHeader, Dropdown, Avatar, Image} from 'antd';
import {LogoutOutlined, LoginOutlined} from "@ant-design/icons";
import {signOut, loginWithGoogle, onUserStateChange} from '../../firebase/auth'
import lotus from '../../img/lotus.png'
import user from '../../img/user.png'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {avatar: user, user: null};
  }

  componentDidMount() {
    onUserStateChange((user) => {
      if (user != null) {
        this.setState({avatar: user.photoURL, user: user})
      }
      else {
        this.setState({avatar: user, user: null});
      }
    })
  }

  logout = () => {
    signOut((rs) => console.log(rs));
  }

  login = () => {
    loginWithGoogle((rs) => {
      console.log(rs)
    })
  }

  render() {
    const menu = (
      <Menu>
        {this.state.user === null ?
          <Menu.Item icon={<LoginOutlined />} key="menu-setting" onClick={this.login}>
            Đăng nhập
        </Menu.Item> :
          <Menu.Item icon={<LogoutOutlined />} key="menu-logout" onClick={this.logout}>
            Đăng xuất
        </Menu.Item>
        }
      </Menu>
    );
    const dropdown = (
      <Dropdown overlay={menu} placement="topRight" key="header-dropdown">
        <Avatar
          className="dropdown-toggle mt-2"
          size={45}
          icon={<Image src={this.state.avatar} preview={false} />}
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
      </Dropdown>
    );
    return (
      <PageHeader className="p-0" title={<Image width={45} height={45} src={lotus} preview={false} />} subTitle={<Link to='/'>Home</Link>} extra={[dropdown]} />
    );
  }
}
