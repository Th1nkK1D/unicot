/* Unicot - Queue mongoDB collection
 * https://github.com/Th1nkK1D/unicot
 * (c) Th1nk.K1D 2017
 */

import { Mongo } from 'meteor/mongo';

export const Queue = new Mongo.Collection('queue');

if (Meteor.isServer) {
  //Init publisher
  Meteor.publish('queue', function() {
    return Queue.find();
  });
}
