import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/imports/ui/stylesheets/app.css';
import AppContainer from '/imports/ui/containers/AppContainer.js';

Meteor.startup(() => {
  render(<AppContainer params={{id: '1'}}/>, document.getElementById('render-target'));
});
