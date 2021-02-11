'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {
  static get objectId() {
    return ['_id', 'post_id'];
  }
}

module.exports = Comment
