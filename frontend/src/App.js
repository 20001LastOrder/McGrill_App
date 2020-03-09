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
import restoHome from './components/restoHome'
import ProfileSettings from './components/profilesettings';
import UserOrders from './components/userorders';
import RestoMain from './components/restaurantMainView';
import ShoppingCart from './components/shoppingCartDi';

const {Sider} = Layout;

export const Auth = {
    currentUser: '',
    isAuthenticated: false,
    token: '',
    async authenticate(userinfo, next) { // {params: {email: userinfo.email, password: userinfo.password}}
      await axios.get('http://localhost:5000/user/login', {headers: userinfo}).then((res) => {
        if (res.data.success) {
          this.token = res.data.token;
          this.isAuthenticated = true;
          this.currentUser = userinfo.email;
          window.localStorage.setItem('token', res.data.token);
          window.localStorage.setItem('email', userinfo.email);
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
        this.currentUser = '';
        window.localStorage.removeItem('token');
        console.log(window.localStorage.getItem('token'))
      next(this.isAuthenticated);
    }
  }

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);
  }
  state = {
    email: '', 
    password: '',
    redirectToReferrer: false
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
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
    Auth.authenticate({email: this.state.email, password: this.state.password}, (res) => {
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
            <label>email </label>
            <input  type="text"
                required
                className="form-control"
                name = 'email'
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group">
            <label>password </label>
            <input 
                type="password" 
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="btn-group">
            <Button onClick={this.login} name='Login'> Login </Button>
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
      <Route path="/profilesettings" component={ProfileSettings} />
      <Route path="/userorders" component={UserOrders} />
      <Route path="/shoppingcart" component={ShoppingCart} />
      {/* /menu is temporarily here to be deleted once restaurant's own url is set */}
      <Route path="/menu" component={MenuPage} />
      <Route path="/restaurants/all" component={restoHome} />
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