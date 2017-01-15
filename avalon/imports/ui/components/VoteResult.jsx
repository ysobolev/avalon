import React, { Component } from 'react';
import '../stylesheets/vote.css';

export default class Vote extends Component {
  render() {
    if (typeof(this.props.result) !== 'undefined') {
      const status = this.props.result ? "approved" : "not approved";
      return (
        <div>
          The team was {status}.
        </div>
      );
    }

    return (
      <div className="waiting">People are voting</div>
    );
  }
}
