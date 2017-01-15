import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../stylesheets/vote.css';

export default class Vote extends Component {
  render() {
    if (this.props.votes) {
      const votes = Object.keys(this.props.votes).map((name, index) => {
        if (this.props.votes[name]) {
          return (<li key={index}>{name} was in favor</li>);
        }
        return (<li key={index}>{name} was against</li>);
      });
      return (
        <div>
          <p>The votes were</p>
          <ul>{votes}</ul>
        </div>
      );
    }

    return (
      <div>
        <Button color="success">Approve</Button>
        <Button color="danger">Reject</Button>
      </div>
    );
  }
}
