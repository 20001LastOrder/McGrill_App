import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import Navbar from "./components/navbar";
import CampusList from "./components/campus";
import CreateAccount from "./components/signup";
import LinkButton from "./components/linkbutton";
import Issue from "./components/issue";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Restaurant from "./components/restaurant/restaurant";
import EditRestaurant from "./components/restaurant/editRestaurant";

import axios from "axios";

export const Auth = {
  isAuthenticated: false,
  token: "",
  isServer: false,
  async authenticate(userinfo, next) {
    // {params: {username: userinfo.username, password: userinfo.password}}
    await axios
      .get("http://localhost:5000/user/login", { headers: userinfo })
      .then(res => {
        if (res.data.success) {
          this.token = res.data.token;
          this.isAuthenticated = true;
          for (var a = 0; a < 1000; a++) console.log(res.data.isServer);
          this.isServer = res.data.role;
        } else {
          this.isAuthenticated = false;
        }
        if (this.isAuthenticated) {
          next(true);
        } else {
          next(false);
        }
      })
      .catch(err => {
        this.isAuthenticated = false;
        next(false);
      });
  },
  signout(next) {
    this.isAuthenticated = false;
    this.token = "";
    next(this.isAuthenticated);
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);
  }
  state = {
    username: "",
    password: "",
    redirectToReferrer: false
  };
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  async login() {
    Auth.authenticate(
      { username: this.state.username, password: this.state.password },
      res => {
        this.setState(() => ({
          redirectToReferrer: res
        }));
      }
    );
  }
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/issue" }
    };
    const redirectToReferrer = this.state.redirectToReferrer;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h3>Login</h3>
        <div className="form-group">
          <label>Username </label>
          <input
            type="text"
            required
            className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
        </div>
        <div className="form-group">
          <label>password </label>
          <input
            type="text"
            className="form-control"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>
        <Button onClick={this.login}> Login </Button>
        <LinkButton to="/signup"> Signup </LinkButton>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export const AuthButton = withRouter(({ history }) =>
  Auth.isAuthenticated ? (
    <p>
      <Button
        onClick={() => {
          Auth.signout(() => history.push("/login"));
        }}
      >
        Sign out
      </Button>
    </p>
  ) : (
    <Button
      onClick={() => {
        history.push("/login");
      }}
    >
      Login
    </Button>
  )
);

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={CreateAccount} />

        <Route path="/restaurant/edit" component={EditRestaurant} />
        <Route path="/restaurant" component={Restaurant} exact />

        <PrivateRoute path="/campus" component={CampusList} />
        <PrivateRoute path="/issue" exact component={Issue} />
        <PrivateRoute path="/issue/:id" component={Issue} />
        <Route path="/" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
