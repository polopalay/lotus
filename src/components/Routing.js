import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Posts from "./view/posts/Posts";
import Detail from "./view/posts/Detail";
import Setting from "./view/user/Setting";
import NotFound from "./layout/NotFound";

class Routing extends Component {
  render() {
    return this.props.app.user == null ? (
      <Redirect to="/accessDenied" />
    ) : (
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/user/:uid" component={Posts} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/setting" component={Setting} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    app: store.app,
  };
};
export default connect(mapStateToProps)(Routing);
