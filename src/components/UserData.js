import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonIcon from '@material-ui/icons/Person'; 
import Link from '@material-ui/core/Link';
import { db, auth } from '../config/fbConfig'
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import { editPermission } from '../store/actions/authActions'


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

class UserData extends Component {
    state = {
        users:[{
            email: '',
            password: '',
            phone: '',
            name: '',
            role: '',
            id: '',
            create: '',
            delete: '',
            update: ''
            }]
    }
    useStyles = makeStyles((theme) => ({
        icon: {
          marginRight: theme.spacing(2),
        },
        heroContent: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
          marginTop: theme.spacing(4),
        },
        cardGrid: {
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(8),
        },
        card: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        cardMedia: {
          paddingTop: '56.25%', // 16:9
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
        cardContent: {
          flexGrow: 1,
        },
        footer: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(6),
        },
      }));

      componentDidMount(){
        const id = this.props.match.params.userId;
        console.log(id);
        db.collection('users')
        .get()
        .then( snapshot => {
            const idd = []
            const users = []
            snapshot.forEach(doc => {
                if(doc.id == id){
                const data = doc.data();
                users.push(data)
                idd.push(doc.id)
                }
            })
            
            this.setState({ users: users})
            let items = [...this.state.users];
            for(var i=0;i<users.length;i++){
                let item = items[i];
                item.id = idd[i];
                items[i] = item;
            }
            this.setState({ items })
            console.log(this.state.users)
        })
        .catch( error => console.log(error))
    }
            
     handleCreateChange = (event) => {
          let items = [...this.state.users];
          let item = items[0];
          item.create = event.target.value;
          items[0] = item;
          this.setState({ items })
          console.log(items)
    };

    handleDeleteChange = (event) => {
      let items = [...this.state.users];
      let item = items[0];
      item.delete = event.target.value;
      items[0] = item;
      this.setState({ items })
      console.log(items)
    };

    handleUpdateChange = (event) => {
      let items = [...this.state.users];
      let item = items[0];
      item.update = event.target.value;
      items[0] = item;
      this.setState({ items })
      console.log(items)
    };

    handleEditButton = (e) =>{
      this.props.editPermission(this.state.users[0]);
    }

render(){
  const { auth } = this.props;
  if(!auth.uid){
      return <Redirect to='/' />
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton color="inherit">
            <a href="/dashboard" style={{ color: 'white' }}>
              Dashboard
            </a>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={makeStyles().heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              <h3> { this.state.users[0].name } </h3>
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Phone : { this.state.users[0].phone } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              email: { this.state.users[0].email }  <br/><br/>
              Create Permission : &nbsp;&nbsp;
              <FormControl className={makeStyles().formControl}>
                <Select
                  native
                  value={this.state.users[0].create}
                  onChange={this.handleCreateChange}
                  
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </Select>
              </FormControl>
              <br/>
              Update Permission : &nbsp;&nbsp;
              <FormControl className={makeStyles().formControl}>
                <Select
                  native
                  value={this.state.users[0].update}
                  onChange={this.handleUpdateChange}
                  
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </Select>
              </FormControl>
              <br/>
              Delete Permission : &nbsp;&nbsp;
              <FormControl className={makeStyles().formControl}>
                <Select
                  native
                  value={this.state.users[0].delete}
                  onChange={this.handleDeleteChange}
                  
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </Select>
              </FormControl>
              <br/><br/>
            </Typography>
            <div className={makeStyles().heroButtons}>
              <Grid container spacing={2} justify="center">
              <Grid item>
                  <Button variant="contained" onClick={this.handleEditButton} color="primary">
                    Update Permissions
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary">
                    Delete User
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        
      </main>
      {/* Footer */}
      <footer className={makeStyles().footer}>
        <Typography variant="h6" align="center" gutterBottom>
          
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
}

const mapStateToProps = (state) =>{
  console.log(state);
  return{
      auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    editPermission: (user) => dispatch(editPermission(user))
}
}

export default connect(mapStateToProps,mapDispatchToProps)(UserData)