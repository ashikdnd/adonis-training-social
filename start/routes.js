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
  Route.post('post/like', 'PostController.likePost').as('likePost')
  Route.delete('post', 'PostController.deletePost').as('deletePost')

  Route.post('comment', 'CommentController.add').as('addComment')
  Route.delete('comment', 'CommentController.delete').as('deleteComment')

  Route.get('user/profile', 'UserController.profile')
  Route.post('user/profile/uploadphoto', 'UserController.uploadPhoto').as('uploadProfilePhoto')

  Route.get('logout', 'AuthController.logout')
}).middleware(['checkAuth', 'auth'])

Route.group(() => {
  Route.post('post/like', 'PostController.likePost').as('likePost')
}).middleware(['checkAuth', 'auth']).prefix('api')

Route.group(() => {
  Route.get('login', 'AuthController.loginPage')
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
  Route.get('email/activate/:activation_code', 'AuthController.activateUser')
}).middleware(['redirectToHome', 'guest'])
