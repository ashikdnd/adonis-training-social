'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
  Route.get('', 'AppController.profile')

  // newsfeed routes
  Route.post('post/submit', 'PostController.add').as('submitPost')
  Route.post('post/submit', 'PostController.update')
  Route.post('post/submit', 'PostController.delete')

  Route.post('comment/add', 'CommentController.add').as('addComment')

  Route.get('logout', 'AuthController.logout')
}).middleware(['checkAuth', 'auth'])

Route.group(() => {
  Route.get('login', 'AuthController.loginPage')
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
}).middleware(['redirectToHome', 'guest'])
