import { Mongo } from 'meteor/mongo';

export const Queue = new Mongo.Collection('queue');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('queue', function() {
    return Queue.find();
  });
}
 