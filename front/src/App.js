import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./protected.route";
import { history } from "./helpers/history";
import "./assets/styles/index.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));

// Pages
const Login = React.lazy(() => import("./pages/login/Login"));
const Home = React.lazy(() => import("./pages/home/Home"));
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/not-found"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/error"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <ProtectedRoute
              exact
              path="/home"
              name="Home Page"
              component={Home}
            />
            <ProtectedRoute path="/" name="Main Page" component={MainLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
