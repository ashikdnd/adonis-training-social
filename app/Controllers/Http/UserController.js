'use strict'
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
class UserController {

  async profile({view, auth}) {
    const user = await User.query().where('_id', auth.user._id).with('profile').first()
    return view.render('user/photo', {
      profile: user.toJSON().profile
    })
  }


  async uploadPhoto({request, response, auth}) {
    const Helper = use('Helpers')
    const file = request.file('photo')
    const fn = (new Date()).getTime() + auth.user._id + '.' + file.subtype;
    await file.move(Helper.publicPath('profilephotos'), {
      name: fn,
      overwrite: true
    });
    if (!file.moved()) {
      return file.error()
    }
    await Profile.where('user_id', auth.user._id).update({
      photo: fn
    })
    return response.redirect('back')
  }

}

module.exports = UserController
