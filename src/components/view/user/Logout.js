import { Component } from "react";
import { signOut } from "../../../services/firebase/auth";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    signOut(() => this.props.history.push("/accessDenied"));
  }
  render() {
    return "";
  }
}
