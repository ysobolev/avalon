import React, { Component } from 'react';

export default class Identity extends Component {
  render() {
    return (
      <div>
        You are {this.props.identity}.
      </div>
    );
  }
}
