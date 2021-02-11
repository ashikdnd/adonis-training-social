'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  likes;
  shares;
  comments;

  constructor() {
    super();
    this.likes = 0;
    this.shares = 0;
    this.comments = 0;
  }

  user() {
    return this.hasOne('App/Models/User', 'user_id', '_id');
  }

  async getTop10(user) {
    return Post.query().where('user_id', user).with('user', (q) => {
      q.select('_id', 'firstname', 'lastname')
    }).orderBy('created_at', 'DESC').limit(10).fetch();
  }
}

module.exports = Post
