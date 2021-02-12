'use strict'

const Comment = use('App/Models/Comment')
const Post = use('App/Models/Post')
const DB = use('Database')
class CommentController {

  async add({request, response, auth}) {
    const data = request.all();
    const cmt = new Comment();
    cmt.post_id = data.pid;
    cmt.comment = data.cmt.trim();
    cmt.user_id = auth.user._id;
    await cmt.save();

    const post = await Post.find(data.pid);
    const cmtcount = post.comments + 1;
    const savePost = await Post.where('_id', data.pid).update({
      comments: cmtcount
    })

    const lastInsert = await Comment.query().orderBy('created_at','DESC').first();
    response.json({
      success: true,
      c_id: lastInsert._id
    });
  }

  async delete({request, response, auth}) {
    const data = request.all();
    try {
      await Comment.where('user_id', auth.user._id).where('_id', data.comment_id).delete()
      response.json({success: true})
    } catch (e) {
      console.log(e)
      response.json({success: false})
    }
  }

}

module.exports = CommentController
