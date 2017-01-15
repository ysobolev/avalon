import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../imports/ui/stylesheets/app.css';
import AppContainer from '../imports/ui/containers/AppContainer';

FlowRouter.route('/', {
  action() {
    mount(AppContainer);
  }
});
