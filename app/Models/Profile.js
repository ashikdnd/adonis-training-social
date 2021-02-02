'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
  static get objectIDs() { return ['_id', 'user_id'] }
}

module.exports = Profile
