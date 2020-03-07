import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Auth } from '../App'

function getAllAttributes(state, form){
    let keys = Object.keys(state);
    keys.forEach((key)=>{
      state[key] = form[key].value;
    })
    return state;
  }

 
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default class UserProfile extends Component {
   
  constructor(props){
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangeStreet= this.onChangeStreet.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
    state = {
      name: "",
      email: "",
      address: {
          street: "",
          city: "",
          zip: ""
      }
    }
    
    //componentDidMount --> 
    async componentDidMount() {
      let self = this;
      console.log(window.localStorage.getItem('email'));
      await axios.get('https://mcgrill-backend.herokuapp.com/user/getUser?email=' + window.localStorage.getItem('email'), { 
        headers: { Authorization: 'Bearer ' +  window.localStorage.getItem('token') }
      })
      .then(res => res.data)
      .then(function(resJson) {
        console.log("json found is:"+resJson);
      self.setState({
        name: resJson.name,
        email: resJson.email,
        address: resJson.address
      })})
      .catch(function (error) {
        console.log(error);
    })
    console.log("state is now:" + this.state.name);
  }
  
    
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
    
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeStreet(e) {
    let addressCopy = this.state.street;
    addressCopy.street = e.target.value;
    this.setState({address : addressCopy});
  }
   
  onChangeCity(e) {
    let addressCopy = this.state.address;
    addressCopy.city = e.target.value;
    this.setState({address : addressCopy});
  }

  onChangeZip(e) {
    let addressCopy = this.state.address;
    addressCopy.zip = e.target.value;
    this.setState({address : addressCopy});
  }

  async onSubmit(e) {
    e.preventDefault();
    await axios({method: 'post', url: 'http://localhost:5000/user/signup', 
           body: this.state,
      headers: {'Content-Type': 'application/json'}
    }).then(async (doc) => {
      await Auth.authenticate(() => {});
    }).catch((err) => {});
  }

render(){
 
  return (
   
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
        <Avatar className={useStyles.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <form className={useStyles.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                value={this.state.name}
                onChange={this.onChangeName}
                label="Name"
                id='name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={this.state.email}
                onChange={this.onChangeEmail}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Street"
                label="Street"
                id='street'
                value={this.state.address.street}
                onChange={this.onChangeStreet}
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="City"
                label="City"
                id='city'
                value={this.state.address.city}
                onChange={this.onChangeCity}
                autoComplete="City"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Zipcode"
                label="Zipcode"
                id='zipcode'
                value={this.state.address.zip}
                onChange={this.onChangeZip}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
          >
            Update Profile
          </Button>
          <Grid container justify="flex-end">
          </Grid>
        </form>
      </div>
      <Box mt={5}>
       
      </Box>
    </Container>
  );
}
}