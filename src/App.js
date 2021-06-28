import "./css/app.scss";
import "antd/dist/antd.css";
import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { onUserStateChange } from "./services/firebase/auth";
import { setUser } from "./reducers/app/app.action";
import { Provider } from "react-redux";
import { Layout } from "antd";
import Header from "./components/layout/Header";
import Routing from "./components/Routing";
import Login from "./components/view/user/Login";
import Logout from "./components/view/user/Logout";
import AccessDenied from "./components/layout/AccessDenied";
import store from "./store";

class App extends Component {
  constructor(props) {
    super(props);
    onUserStateChange((user) => {
      store.dispatch(setUser(user));
    });
  }
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Layout className="app">
            <Layout.Header
              className="px-3"
              style={{ backgroundColor: "white" }}
            >
              <Header />
            </Layout.Header>
            <Layout.Content className="p-3">
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/accessDenied" component={AccessDenied} />
                <Route path="/" component={Routing} />
              </Switch>
            </Layout.Content>
          </Layout>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
