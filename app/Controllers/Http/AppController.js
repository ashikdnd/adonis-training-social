'use strict'
const User = use('App/Models/User')
const Profile = user('App/Models/Profile')
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

  async profile({request, response, view, auth}) {
    const user = await User.query().where('_id', auth.user._id).with('profile').first()
    return view.render('user/profile', {
      profile: user.toJSON().profile
    });
  }

}

module.exports = AppController
