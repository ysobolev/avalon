import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../stylesheets/vote.css';
import Proposal from './Proposal.jsx';
import Vote from './Vote.jsx';
import VoteResult from './VoteResult.jsx';

export default class VoteStage extends Component {
  render() {
    const results = (() => {
      if (typeof(this.props.result) !== 'undefined') {
        const status = this.props.result ? "approved" : "not approved";
        return (
          <div>
            The team is {status}.
          </div>
        );
      } else {
        return (
          <div className="waiting">People are voting</div>
        );
      }
    })();

    const vote = (this.props.proposal.length > 0) && <Vote {...this.props} />;
    const result = (typeof(this.props.result) !== 'undefined') && <VoteResult {...this.props} />
    return (
      <div>
      <Proposal {...this.props} />
      {vote}
      {result}
      </div>
    );
  }
}
