import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Menu, PageHeader, Dropdown, Avatar, Image, Typography} from 'antd';
import {LogoutOutlined, LoginOutlined} from "@ant-design/icons";
import {onUserStateChange} from '../../firebase/auth'
import lotus from '../../img/lotus.png'
import userImg from '../../img/user.png'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {avatar: userImg, user: null};
  }

  componentDidMount() {
    onUserStateChange((user) => {
      if (user != null) {
        this.setState({avatar: user.photoURL, user: user})
      }
      else {
        this.setState({avatar: userImg, user: null});
      }
    })
  }

  render() {
    const menu = (
      <Menu>
        {this.state.user === null ?
          <Menu.Item icon={<LoginOutlined />} key="menu-setting">
            <Link to='/login'>Đăng nhập</Link>
          </Menu.Item> :
          <Menu.Item icon={<LogoutOutlined />} key="menu-logout">
            <Link to='/logout'>Đăng xuất</Link>
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
      <PageHeader className="p-0" title={
        <Image width={45} height={45} src={lotus} preview={false} />
      } subTitle={<Typography.Text strong><Link style={{color:'#000000'}} to='/'>Home</Link></Typography.Text>} extra={[dropdown]} />
    );
  }
}
