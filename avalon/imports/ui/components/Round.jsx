import React, { Component } from 'react';

export default class Round extends Component {
  render() {
    return (
      <div>
        <div>--- {this.props.round} ---</div>
        <br />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
