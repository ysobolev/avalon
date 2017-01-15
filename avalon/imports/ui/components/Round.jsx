import React, { Component } from 'react';
import Panel from './Panel.jsx';
import Stage from './Stage.jsx';

export default class Round extends Component {
  render() {
    const stages = this.props.stages.map((stage, index) =>
      <div key={index}><Stage {...stage} /><hr /></div>
    );
    return (
      <Panel title={this.props.name}>
        {
          this.props.stages.map((stage, index, array) => {
            const hr = index < array.length - 1 && <hr />;
            return (
              <div key={index}>
                <Stage {...stage} />
                {hr}
              </div>
            );
          })
        }
      </Panel>
    );
  }
}
