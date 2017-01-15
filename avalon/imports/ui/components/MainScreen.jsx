import React, { Component } from 'react';
import Panel from './Panel.jsx';
import Round from './Round.jsx';
import Identity from './Identity.jsx';

export default class MainScreen extends Component {
  render() {
    const game = this.props.game;
    const rounds = game.rounds.map((round, index) =>
      <Round key={index} {...round} />
    );
    return (
      <div>
        <Panel title="Identity">
          <Identity identity={game.identity} />
        </Panel>
        {rounds}
      </div>
    );
  }
}
