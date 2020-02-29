import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><a className="nav-link" href={null} onClick={() => props.display_form('login')}>Login</a></li>
      <li className="nav-item"><a className="nav-link" href={null} onClick={() => props.display_form('signup')}>Signup</a></li>
    </ul>
  );

  const logged_in_nav = (
    <ul className="navbar-nav mr-auto">
      <li  className="nav-item"><a href={null} onClick={props.handle_logout}>logout</a></li>
    </ul>
  );
  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       
        <a className="navbar-brand" onClick={props.display_home}>Student Report</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
            
            </ul>
            
            <span className="navbar-text">
            {props.logged_in ? logged_in_nav : logged_out_nav}
            </span>
        </div>
    </nav>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  display_home: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};