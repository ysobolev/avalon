import React, { Component } from 'react';
import Panel from './Panel.jsx';
import Round from './Round.jsx';

export default class MainScreen extends Component {
  make_round(n) {
    return (
      <Round round={n} key={n}>
        <Panel title="hi">
          foobar
        </Panel>
      </Round>
    );
  }

  render() {
    const rounds = [...Array(game.round).keys()].map((i) =>
      this.make_round(i+1)
    );
    return (
      <div>
        {rounds}
      </div>
    );
  }
}
