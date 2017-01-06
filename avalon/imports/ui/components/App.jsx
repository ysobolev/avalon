import React, { Component } from 'react';
import LoginScreen from './LoginScreen.jsx';
import SettingsScreen from './SettingsScreen.jsx';



export default class App extends Component {
  login() {
    console.log("login");
  }

  render() {
    if (!this.props.game) {
      return (
        <LoginScreen login={this.login} />
      );
    }
    const game = this.props.game;
    if (game.round === 0) {
      return (
        <SettingsScreen />
      );
    } else {
      return (
        <MainScreen game={this.props.game} />
      );
    }
  }
}
