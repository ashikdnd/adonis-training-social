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

}

module.exports = CommentController
