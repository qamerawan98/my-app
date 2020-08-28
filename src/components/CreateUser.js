import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux'
import {signUp} from '../store/actions/authActions'
import {Redirect} from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class CreateUser extends Component {
    state={
        email: '',
        password: '',
        phone: '',
        name: '',
        role: 'user'
    }
    
    useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
      handleChange = (e) =>{
        this.setState({
          [e.target.id]: e.target.value
        })
      }
      handleSubmit = (e) =>{
          e.preventDefault();
          this.props.signUp(this.state);
      }
render(){
  const {authError, auth } = this.props;
        if(!auth.uid){
            return <Redirect to='/' />
        }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={makeStyles().paper}>
        <Avatar className={makeStyles().avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create User
        </Typography>
        <form onSubmit={this.handleSubmit} className={makeStyles().form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                onChange = {this.handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                onChange = {this.handleChange}
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange = {this.handleChange}
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
                onChange = {this.handleChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={makeStyles().submit}
          >
            Create User
          </Button>
          <div>
            {authError ? <Alert severity="error">{authError}</Alert> : null}
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
}

const mapStateToProps = (state) =>{
  console.log(state);
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      signUp: (newUser) => dispatch(signUp(newUser))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)