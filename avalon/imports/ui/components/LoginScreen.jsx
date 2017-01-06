import React, { Component } from 'react';
import '../stylesheets/login.css';

export default class LoginScreen extends Component {
  render() {
    return (
      <div className="container fill-height">
        <form className="form-login" role="form">
      	  <h2 className="form-login-heading">Avalon</h2>
	        <input
	          type="text"
	          className="form-control form-control-name"
	          placeholder="Name"
	          id="name"
	          required
	          autoFocus
	        />
      	  <input
      	    type="text"
      	    className="form-control form-control-group"
      	    placeholder="Group"
      	    id="group"
      	  />
      	  <button
      	    className="btn btn-lg btn-primary btn-block"
      	    onClick={this.props.login}>
      	    Play
      	  </button>
	        <br />
	        <div
            className="alert alert-danger hidden"
            id="alert"
            style={ {display: 'none'} }
          >
	          Someone with that name is already playing.
	        </div>
        </form>
        <footer className="footer text-muted">
          Avalon v.0.2.0 | <a href="https://github.com/ysobolev/avalon">Source</a>
        </footer>
      </div>
    );
  }
}

LoginScreen.propTypes = {
  login: React.PropTypes.func
};
