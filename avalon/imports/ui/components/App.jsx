import React, { Component } from 'react';
import LoginScreen from './LoginScreen.jsx';


export default class App extends Component {
  render() {
    if (this.props.active) {
      return (<div>Active game</div>);
    }
    return (
      <LoginScreen />
    );
  }
}
