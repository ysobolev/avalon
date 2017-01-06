import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../components/App';
import { Games } from '../../api/games';

sample_game = {
  round: 1,
  players: []
}

const AppContainer = createContainer(() => {
  Meteor.subscribe('games');
  return {
    //game: Games.findOne(),
    game: sample_game,
  };
}, App);

export default AppContainer;
