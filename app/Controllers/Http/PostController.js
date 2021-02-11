'use strict'

const Post = use('App/Models/Post')

class PostController {

  async add({request, response, auth}) {
    try {
      const input = request.all()
      const post = new Post();
      post.user_id = auth.user._id;
      post.content = input['post_content'];
      await post.save()
      response.redirect('back');
    } catch (e) {
      console.log(e)
      response.redirect('back').withErrors({
        message: e
      })
    }
  }
}

module.exports = PostController
