import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Result, Button} from 'antd'

export default class NotFound extends Component {
   render() {
      return <Result
         status="404"
         title="404"
         subTitle="Không tìm thấy trang yêu cầu!"
         extra={<Button type='primary'><Link to="/">Về trang chủ</Link></Button>}
      />
   }
}
