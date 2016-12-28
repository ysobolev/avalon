import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../components/App.jsx';

export default AppContainer = createContainer(({ params }) => {
  const { id } = params;
  return { active: false };
}, App);
