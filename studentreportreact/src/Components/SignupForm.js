import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey} from '@fortawesome/free-solid-svg-icons';


class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (<div className="container mt-1">
    <div className="d-flex justify-content-center h-100">
      <div className="card">
        <div className="card-header">
          <h3 >Sign Up</h3>
          
        </div>
        <div className="card-body">
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FontAwesomeIcon icon={ faUser} /></span>
              </div>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handle_change}
                className="form-control input_user"
                placeholder="Username"
              />
         </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
              </div>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handle_change}
                className="form-control input_pass"
                placeholder="Password"
              />
              </div>
              <div className="form-group">
              <input type="submit" value="Sign Up" className="btn float-right btn-outline-dark"/>
            </div>
         </form>
         </div>
        <div className="card-footer">
          
          <div className="d-flex justify-content-center">
            Contact Administrator
          </div>
        </div>
      </div>
    </div>
    </div>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};