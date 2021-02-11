'use strict'
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Post = use('App/Models/Post')
class AppController {

  async listUsers({request, response, view}) {
    const userList= await User.all();
    return view.render('user/list', {
      list: userList
    })
  }

  async fetchUserProfile({request, response}) {
    const profile = await Profile.find(request._id)
    return profile;
  }

  async profile({view, auth}) {
    const user = await User.query().where('_id', auth.user._id).with('profile').first()
    const post = new Post();
    const postList =  await post.getTop10(auth.user._id)
    // return postList;
    return view.render('user/profile', {
      profile: user.toJSON().profile,
      postList: postList.toJSON()
    });
  }

}

module.exports = AppController
