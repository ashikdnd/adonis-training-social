'use strict'
const User = use('App/Models/User')

class AppController {

  async profile({request, response, view, auth}) {
    const user = await User.find(auth.user._id)
    const p = await user.profile().fetch()
    return view.render('user/profile');
  }

}

module.exports = AppController
