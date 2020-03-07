import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet'
import Nav from './Nav';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Welcome from './Welcome';
import Home from './Home';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TITLE, HOST} from './constants';
toast.configure({
  autoClose: 3000,
  draggable: false,
  //etc you get the idea
});
class App extends Component{
  constructor(props){
    super(props);
    const access_token = fetch(HOST+'/api/token/refresh/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: `{
          "refresh":"${localStorage.getItem('refresh')}"}`    
      })
      .then(res => res.json())
      .then(json => {
          if(json.non_field_errors){
              toast.error("Couldn't Refresh. Something Went Wrong.");  
              return;
          }
          return json.access;
        })
      .catch(function(error) {
        toast.error("Sorry. Something went wrong while refreshing.");
    });
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('refresh') ? true : false,
      username: '',
      access_token:(access_token)? access_token:'',
    }
  }
  componentDidMount() {
    if (this.state.logged_in) {
      fetch(HOST+'/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('refresh')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    // fetch(HOST+'/token-auth/', {
    fetch(HOST+'/api/token/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if(json.non_field_errors){
          toast.error("Unable to log in with provided credentials.");  
          return;
        }
        localStorage.setItem('refresh', json.refresh);
        this.setState({
          logged_in: true,
          displayed_form: '',
          // username: json.user.username,
          access_token: json.access,
        });
        console.log(json);
        // toast.success("Logged in as "+json.user.username);
      }).catch(function(error) {
        toast.error("Something went Wrong!");
        console.log("error:", typeof(error), error);
    });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch(HOST + '/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('refresh', json.refresh);
        this.setState({
          logged_in: true,
          displayed_form: '',
          // username: json.username,
          access_token: json.access,
        });
      });
  };
  
  handle_logout = () => {
    localStorage.removeItem('refresh');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };
  
  display_home = ()=>{
    console.log('home');
    this.setState(
      {
        displayed_form: 'Home'
      }
    );
  };
  auth_headers = async () => {
    // return authorization header with basic auth credentials
    const access_token = await this.state.access_token;
    if (access_token) {
      return { Authorization: `Bearer ${access_token}` };
    } else {
        return {};
    }
  }
  refresh_access_token = () =>{
    return fetch(HOST+'/api/token/refresh/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: `{
          "refresh":"${localStorage.getItem('refresh')}"}`    
      })
      .then(res => res.json())
      .then(json => {
          if(json.non_field_errors){
              toast.error("Couldn't Refresh. Something Went Wrong.");  
              return;
          }
          return json.access;
        })
      .catch(function(error) {
        toast.error("Sorry. Something went wrong while refreshing.");
    });
  }
  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      case 'Home':
        (this.state.logged_in)? form =<Home/> : form = <Welcome/>
        break;
      default:
        form = <Welcome />;
    }
    return (
      <div className="App">
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
          display_home = {this.display_home}
        />
        {this.state.logged_in ? <Home auth_headers = {this.auth_headers} /> :form }
      
      </div>
    );
  }


}

export default App;
