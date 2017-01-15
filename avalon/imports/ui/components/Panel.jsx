import React, { Component } from 'react';
import { Collapse, CardBlock, Card, CardHeader } from 'reactstrap';

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({open: !this.state.open});
  }

  componentWillMount() {
    this.setState({open: true});
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <a href="#" onClick={this.toggle}>
            {this.props.title}
          </a>
        </CardHeader>
        <Collapse isOpen={this.state.open}>
          <CardBlock>
            {this.props.children}
          </CardBlock>
        </Collapse>
      </Card>
    );
  }
}
