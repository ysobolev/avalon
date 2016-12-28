import { createContainer } from 'meteor/react-meteor-data';
import App from '../components/App';

const AppContainer = createContainer(() => ({ active: false }), App);

export default AppContainer;
