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
import Result from './Result';
toast.configure({
  autoClose: 3000,
  draggable: false,
  //etc you get the idea
});
class App extends Component{
  constructor(props){
    super(props);
    const refresh_token = null;
    const access_token = null;
    const local_storage = false;
    this.state = {
      displayed_form: '',
      logged_in: this.get_refresh_token(local_storage) ? true : false,
      username: '',
      access_token:(access_token)? access_token:'',
      display_result: false,
    }
  }
  set_refresh_token(local, refresh){
    if(!local){
      this.refresh_token = refresh;
    }else{
      localStorage.setItem('refresh', refresh);
    }
  }
  get_refresh_token = (local)=>{
    if(!local){
      return this.refresh_token;
    }else{
      return localStorage.getItem('refresh');
    }
  }

  componentDidMount() {
    setInterval(()=>{
      if(this.get_refresh_token(this.local_storage)){
        this.refresh_access_token();
      }
    }, 1000*60*4.5);
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch(HOST+'/api/token/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log(res);
        if(res.status === 401){
          return -1;
        }
        return res.json();
      })
      .then(json => {
        if(json === -1 || json.non_field_errors){
          toast.error("Unable to log in with provided credentials.");  
          return;
        }
        this.set_refresh_token(this.local_storage, json.refresh);
        this.setState({
          logged_in: true,
          displayed_form: '',
          access_token: json.access,
        });
        this.get_username();
      }).catch(function(error) {
        toast.error("Something went Wrong!");
    });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    // fetch(HOST + '/users/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(res => res.json())
    //   .then(json => {
    //     this.set_refresh_token(this.local_storage, json.refresh);
    //     this.setState({
    //       logged_in: true,
    //       displayed_form: '',
    //       access_token: json.access,
    //     });
    //     this.get_username();
    //   });
  };
  
  handle_logout = () => {
    localStorage.removeItem('refresh');
    this.setState({ logged_in: false, username: ''});
    this.refresh_token = '';
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
  auth_headers = () => {
    if (this.state.access_token) { 
      return { Authorization: `Bearer ${this.state.access_token}` };
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
          "refresh":"${this.get_refresh_token(this.local_storage)}"}`    
      })
      .then(res => res.json())
      .then(json => {
          if(json.non_field_errors){
              toast.error("Couldn't Refresh. Something Went Wrong.");  
              return;
          }
          console.log('refreshed '+json.access);
          this.setState({access_token:json.access});
          return json.access;
        })
      .catch(function(error) {
        toast.error("Sorry. Something went wrong while refreshing.");
    });
  }
  get_username = async() => {
    const header = this.auth_headers();
    await fetch(HOST+'/current_user/', {
        method: 'GET',
        headers: header ,     
        })
      .then(res => res.json())
      .then(json => {
        if(json.username == undefined){
          return
        }
        this.setState({ username: json.username });
        toast.success('Welcome ' + this.state.username);
      });
  }
  show_result=()=>{
    this.setState({
      display_result:true,
    });
  }
  show_home=()=>{
    this.setState({
      display_result:false,
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
        // form = <Welcome />;
        form = <LoginForm handle_login={this.handle_login} />;
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
          username = {this.state.username}
        />
        {this.state.logged_in ? (this.state.display_result)?<Result auth_headers = {this.auth_headers} show_home={this.show_home}/>:<Home auth_headers = {this.auth_headers} show_result= {this.show_result}/> :form }
      
      </div>
    );
  }


}

export default App;
