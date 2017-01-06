import React, { Component } from 'react';

export default class Panel extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">{this.props.title}</div>
        <div className="card-block">
          {this.props.children}
        </div>
      </div>
    );
  }
}
