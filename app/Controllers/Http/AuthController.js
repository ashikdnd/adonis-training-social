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
      if(auth.user.active === 0) {
        await auth.logout();
        session.flash({message: 'Activate your account from email'})
        return response.redirect('back')
      }
      return response.redirect('/')
    } else {
      session.flash({message: 'Invalid login'})
      return response.redirect('/login')
    }
  }

  async register({request, response, session}) {
    const Mail = use('Mail')
    const Hash = use('Hash')
    const Helper = use('Helpers')
    try {
      const input = request.all();

      const hash = await Hash.make((new Date()).toISOString())

      const check = await User.where('email', input.email).first()

      if(check) {
        session.flash({message: 'Email is already taken'})
        return response.redirect('back')
      }


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
      user.activation_code = hash;
      user.active = 0;
      await user.save()

      const lastInsert = await User.query().orderBy('created_at','DESC').first();

      profile.user_id = lastInsert._id;

      const user_profile = new Profile()
      user_profile.fill(profile)
      await user_profile.save();

      session.flash({message: 'Registration successful'})

      await Mail.send('email.activation.activation', {
        fn: input.firstname,
        ln: input.lastname,
        url: 'http://0.0.0.0/email/activate/' + hash
      }, (message) => {
        message.from('ashikdnd@gmail.com')
        message.to(input.email)
      })

      return response.route('login')
    } catch(e) {
      console.log(e)
      session.flash({message: 'Registration failed. Try again.'})
      return response.route('login')
    }
  }


  async activateUser({request, response, session}) {
    const check = await User.where('activation_code', request.params.activation_code).first();
    if(check) {
      await User.where('activation_code', request.params.activation_code).update({
        active: 1
      })
      session.flash({message: 'Account activated'})
      return response.redirect('/login')
    } else {
      session.flash({message: 'Invalid access'})
      return response.redirect('/login')
    }
  }

  async logout({response, auth}) {
    await auth.logout();
    return response.redirect('login');
  }

}

module.exports = AuthController
