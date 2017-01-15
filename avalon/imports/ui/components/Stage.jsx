import React, { Component } from 'react';
import VoteStage from './VoteStage.jsx';
import Quest from './Quest.jsx';

export default class Stage extends Component {
  render() {
    const type = this.props.type;
    switch (type) {
      case "vote":
        return <VoteStage {...this.props} />;
      case "quest":
        return <Quest {...this.props} />;
      case "assassin":
        return (<div>assassin</div>);
      default:
        return (<div>Unknown round stage</div>);
    }
  }
}
