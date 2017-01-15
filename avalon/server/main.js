import { Meteor } from 'meteor/meteor';
import { Games } from '../imports/api/games';

Meteor.publish('games', (username, group) => {
  console.log("subscribe for", username, group);
  if (username) {
    return Games.find();
  }
  return null;
});
