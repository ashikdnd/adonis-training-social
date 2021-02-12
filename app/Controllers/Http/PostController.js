'use strict'

const Post = use('App/Models/Post')
const PostLike = use('App/Models/PostLike')
const Comment = use('App/Models/Comment')

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

  async likePost({request, response, auth}) {
    const data = request.all();
    const check = await PostLike.where('post_id', data.post_id).where('user_id', auth.user._id).first()

    if(check) {
      return response.json({success: false})
    }
    try {
      const like = new PostLike();
      like.post_id = data.post_id;
      like.user_id = auth.user._id;
      await like.save();

      const likeCount = await Post.where('_id', data.post_id).first()
      let newCount = likeCount.likes + 1;
      await Post.where('_id', data.post_id).update({
        likes: newCount
      })
      response.json({success: true})
    } catch(e) {
      console.log(e)
      response.json({success: false, error: e})
    }
  }

  async deletePost({request, response, auth}) {
    const data = request.all();
    try {
      await Comment.where('user_id', auth.user._id).where('post_id', data.post_id).delete();
      await Post.where('user_id', auth.user._id).where('_id', data.post_id).delete();
      response.json({success: true})
    } catch(e) {
      console.log(e)
      response.json({success: false})
    }
  }
}

module.exports = PostController
