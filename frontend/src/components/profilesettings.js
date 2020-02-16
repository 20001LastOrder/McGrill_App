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
   
    //constructor
    
    //componentDidMount --> 
    async componentDidMount() {
      this.setState({
        name: Auth.currentUser.name,
        email: Auth.currentUser.email,
        address: {
          street: Auth.currentUser.street,
          city: Auth.currentUser.city,
          zip: Auth.currentUser.zip
        }
      })
      
    }
    
    //state
    state = {
      name: "",
      email: "",
      address: {
          street: "",
          city: "",
          zip: ""
      }
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
        <form className={useStyles.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                value={this.state.name}
                onChange={this.onChangeName}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
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