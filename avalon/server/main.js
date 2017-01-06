import { Meteor } from 'meteor/meteor';
import { Games } from '../imports/api/games';

Meteor.publish('games', () => Games.find());
