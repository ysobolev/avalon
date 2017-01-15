import React, { Component } from 'react';
import '../stylesheets/login.css';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', group: ''};
    this.login = this.login.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleGroup = this.handleGroup.bind(this);
  }

  handleUsername(event) {
    this.setState({username: event.target.value});
  }

  handleGroup(event) {
    this.setState({group: event.target.value});
  }

  login(event) {
    //event.preventDefault();

    this.props.login(this.state.username, this.state.group);
  }

  render() {
    return (
      <div className="container fill-height">
        <form className="form-login" role="form">
      	  <h2 className="form-login-heading">Avalon</h2>
	        <input
	          type="text"
	          className="form-control form-control-name"
	          placeholder="Name"
            value={this.state.username}
            onChange={this.handleUsername}
	          required
	          autoFocus
	        />
      	  <input
      	    type="text"
      	    className="form-control form-control-group"
      	    placeholder="Group"
            value={this.state.group}
            onChange={this.handleGroup}
      	  />
      	  <button
      	    className="btn btn-lg btn-primary btn-block"
      	    onClick={this.login}>
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
