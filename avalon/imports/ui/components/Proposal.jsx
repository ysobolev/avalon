import React, { Component } from 'react';
import Vote from './Vote.jsx';
import Quest from './Quest.jsx';

export default class Proposal extends Component {
  render() {
    if (this.props.proposal.length) {
      return (
        <div>
          <p>{this.props.leader} proposed a team consisting of</p>
          <ul>
            {this.props.proposal.map((name, index) =>
              <li key={index}>{name}</li>
            )}
          </ul>
        </div>
      )
    } else {
      return (
        <div className="waiting">{this.props.leader} is choosing a team</div>
      );
    }
  }
}
