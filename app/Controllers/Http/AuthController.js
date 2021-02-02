'use strict'
const Helpers = use('Helpers')
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const DB = use('Database')

class AuthController {
  loginPage({view, request}) {
    return view.render('auth/login', {
      pageTitle: 'Social Network Authentication',
      formTitle: 'LOGIN TO APP'
    })
  }

  async login({request, response, auth, session}) {
    const input = request.all();
    const email = input.email;
    const pass = input.password;
    if(await auth.attempt(email, pass)) {
      return response.redirect('/')
    } else {
      session.flash({message: 'Invalid login'})
      return response.redirect('login')
    }
  }

  async register({request, response, session}) {
    try {
      const input = request.all();
      const dob = input.dob;

      delete input['_csrf'];
      delete input['dob'];
      delete input['optionsCheckboxes'];

      const user = new User();
      user.fill(input);
      const new_user = await user.save()

      const user_profile = new Profile()
      user_profile.user_id = new_user._id;
      user_profile.dob = dob;
      user_profile.save();

      session.flash({message: 'Registration successful'})
      return response.route('login')
    } catch(e) {
      session.flash({message: 'Registration failed. Try again.'})
      return response.route('login')
    }
  }

  async logout({response, auth}) {
    await auth.logout();
    return response.redirect('login');
  }
}

module.exports = AuthController
