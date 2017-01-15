import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../components/App';
import { Games } from '../../api/games';
import { Session } from 'meteor/session'

sample_game = {'identities': {'bar': {'alignment': 'evil', 'character': 'morgana'},
                'foo': {'alignment': 'good', 'character': 'merlin'}},
 'result': {},
 'rounds': [{'name': 'Round 1', 'result': {},
             'stages': [{'leader': 'foo',
                         'proposal': ['foo', 'bar'],
                         'result': false,
                         'type': 'vote',
                         'votes': {"foo":true, "bar":false}},
                        {'leader': 'bar',
                         'proposal': [],
                         'type': 'vote'},
                        {'members': [], 'result': {}, 'type': 'quest'}]},
            {'name': 'Round 2', 'stages': [{'guess': 'foo', 'result': {}, 'type': 'assassin'}]}]}

class AvalonMeteorAPI {
  login(username, group) {
    // Meteor.call('login', username, group);
    // TODO: only update if login is successful
    // this will trigger the createContainer below to rerun
    Session.set("username", username);
    Session.set("group", group);
    Session.set("error", null); // last error trying to login
    console.log(username, group);
  }

  logout() {
    Meteor.call('logout');
  }

  vote(id, choice) {
    Meteor.call('vote', id, choice);
  }

  quest(id, choice) {
    Meteor.call('quest', id, choice);
  }

  propose(id, proposal) {
    Meteor.call('propose', id, proposal);
  }
}

const api = new AvalonMeteorAPI();

const AppContainer = createContainer(() => {
  const username = Session.get('username');
  const group = Session.get('group');
  Meteor.subscribe('games', username, group);
  return {
    game: Games.findOne(),
    api: api
  };
}, App);

export default AppContainer;
