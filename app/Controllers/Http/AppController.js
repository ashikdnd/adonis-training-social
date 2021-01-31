'use strict'

class AppController {

  async profile({request, response, view, auth}) {
    return view.render('user/profile');
  }

}

module.exports = AppController
