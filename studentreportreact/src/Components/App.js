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

toast.configure({
  autoClose: 3000,
  draggable: false,
  //etc you get the idea
});

const TITLE = 'Exam Report'
// function App() {
//   return (
//     <div className="App">
//       <Helmet>
//         <title>{TITLE}</title>
//       </Helmet>
//       <header className="App-header">
      
//       </header>
//     </div>
//   );
// }
class App extends Component{
  constructor(props){
    super(props);
    this.state= {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    }
  }
  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
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
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
        toast.success("Logged in as"+" "+json.user.username);
      }).catch(function() {
        toast.error("Something went Wrong!");
        console.log("error");
    });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };
  
  handle_logout = () => {
    localStorage.removeItem('token');
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
        {this.state.logged_in ? <Home/> :form }
      
      </div>
    );
  }


}

export default App;
