import React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import CustomerSignup from './components/customer_signup';
import OwnerSignup from './components/owner_signup';
import LinkButton from './components/linkbutton';
import Button from 'react-bootstrap/Button'
import MenuPage from './components/menu_page';
import HomePage from './components/homelayout'
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from './components/sidebar';
import {Layout} from 'antd';
import axios from 'axios';

const {Sider} = Layout;

export const Auth = {
    isAuthenticated: false,
    token: '',
    async authenticate(userinfo, next) { // {params: {username: userinfo.username, password: userinfo.password}}
      await axios.get('http://localhost:5000/user/login', {headers: userinfo}).then((res) => {
        if (res.data.success) {
          this.token = res.data.token;
          this.isAuthenticated = true;
          window.localStorage.setItem('token', res.data.token);
          console.log(window.localStorage.getItem('token'))
        } else {
          this.isAuthenticated = false;
        }
        if (this.isAuthenticated) {
          next(true);
        } else {
          next(false);
        }
      }).catch((err) => {
        this.isAuthenticated = false;
        next(false);
      })
    },
    signout(next) {
        this.isAuthenticated = false;
        this.token = '';
        window.localStorage.removeItem('token');
        console.log(window.localStorage.getItem('token'))
      next(this.isAuthenticated);
    }
  }

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);
  }
  state = {
    username: '', 
    password: '',
    redirectToReferrer: false
  }
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
  enter() {

  }

  async login() {
    Auth.authenticate({email: this.state.username, password: this.state.password}, (res) => {
      window.location.href = '/';
    });
  }
  render() {
    
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const redirectToReferrer  = this.state.redirectToReferrer;
    
    if (redirectToReferrer === true) {
      return (<Redirect to={from} />)
    }

    return (
      <div>
        <h3>Login</h3>
          <div className="form-group"> 
            <label>Username </label>
            <input  type="text"
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
          <div className="btn-group">
            <Button onClick={this.login}> Login </Button>
          </div>
        </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

export const AuthButton = withRouter(({ history }) => (
  Auth.isAuthenticated ? (
    <p>
      <Button name='signout_btn' onClick={() => {
        Auth.signout(() => history.push('/login'))
      }}>Sign out</Button>
    </p>
  ) : (
    <Button onClick={() => {
      history.push('/login')
    }}>Login</Button>
  )
))

function App() {
  let state = {
    collapsed: false,
  };

 return (
   <Router>
     <Layout>
     <Sider trigger={null} collapsible collapsed={state.collapsed}>
                         <img src={(require('./pictures/banner.jpg'))}
                              style={{
                             height: '10%', width: '100%'
                         }}/>
                    <Sidebar />
                </Sider>
      <Layout>
      <Route path="/login" component={Login} />
      <Route path="/owner/signup" component={OwnerSignup} />
      <Route path="/user/signup" component={CustomerSignup} />
      <Route path="/" exact component={HomePage} />
      {/* /menu is temporarily here to be deleted once restaurant's own url is set */}
      <Route path="/menu" component={MenuPage} />
      <Route path="/logout"  render={()=>
          Auth.signout(()=>{
            window.location.href = '/'
          })
      } />
      </Layout>
      </Layout>
   </Router>
 );
}
export default App;