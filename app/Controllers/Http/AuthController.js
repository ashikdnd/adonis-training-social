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
      const dob = input.datetimepicker;
      const designation = input['designation'];

      const profile = {
        dob: dob,
        designation: designation
      }

      delete input['_csrf'];
      delete input['datetimepicker'];
      delete input['optionsCheckboxes'];
      delete input['designation'];

      const user = new User();
      user.fill(input);
      await user.save()

      const lastInsert = await User.query().orderBy('created_at','DESC').first();

      profile.user_id = lastInsert._id;

      const user_profile = new Profile()
      user_profile.fill(profile)
      await user_profile.save();

      session.flash({message: 'Registration successful'})
      return response.route('login')
    } catch(e) {
      console.log(e)
      session.flash({message: 'Registration failed. Try again.'})
      return response.route('login')
    }
  }

  async uploadProfile({request, response}) {
    const input = request.all()
    const file = input.file('uploaded_file')
    const saveFile = file.move('')
    if(saveFile) {
      response.json({success: true, message: saveFile})
    }
  }

  async logout({response, auth}) {
    await auth.logout();
    return response.redirect('login');
  }
}

module.exports = AuthController
