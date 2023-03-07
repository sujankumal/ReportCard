import React, {Component} from 'react';
import PropTypes from 'prop-types';

// function Nav(props) {
class Nav extends Component{
  // constructor(props){
  //   super(props);
  // }
  componentDidMount(){
  }

  render(){
    const logged_out_nav = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item"><button className="btn btn-link nav-link" href={null} onClick={() => this.props.display_form('login')}>Login</button></li>
        <li className="nav-item"><button className="btn btn-link nav-link" href={null} onClick={() => this.props.display_form('signup')}>Signup</button></li>
      </ul>
    );

    const logged_in_nav = (
      <ul className="navbar-nav mr-auto">
      <li className="nav-item"><button className="btn btn-link nav-link" href={null} onClick={() => this.props.display_form('AdminInput')}>{this.props.username}</button></li>
      <li  className="nav-item"><button className="btn btn-link nav-link" href={null} onClick={this.props.handle_logout}>Logout</button></li>
    </ul>
  );
  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       
        <button className="btn btn-link navbar-brand" onClick={this.props.display_home}>Student Report</button>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
            
            </ul>
            
            <span className="navbar-text">
            {this.props.logged_in ? logged_in_nav : logged_out_nav}
            </span>
        </div>
    </nav>;
    }
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  display_home: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};