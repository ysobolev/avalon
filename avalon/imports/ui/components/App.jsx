import React, { Component } from 'react';
import LoginScreen from './LoginScreen.jsx';
import SettingsScreen from './SettingsScreen.jsx';
import MainScreen from './MainScreen.jsx';


export default class App extends Component {
  render() {
    if (!this.props.game) {
      return (
        <LoginScreen login={this.props.api.login} />
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
