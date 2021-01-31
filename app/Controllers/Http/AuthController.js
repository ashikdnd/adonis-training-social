'use strict'
const Helpers = use('Helpers')
const User = use('App/Models/User')
const DB = use('Database')

class AuthController {
  loginPage({view}) {
    return view.render('auth/login', {
      pageTitle: 'Social Network Authentication',
      formTitle: 'LOGIN TO APP'
    })
  }

  async listUsers({request, response, $userid}) {
    return await User.all()
  }

  async updateUser({request, response}) {
    const update = User.where('_id', '601667934ab3006b17b6567b').update({
      'username': 'UpdateUSERNAME'
    })
    response.json({success: true})
  }
}

module.exports = AuthController
