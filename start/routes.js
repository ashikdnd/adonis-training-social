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
}).middleware('auth')

Route.group(() => {
  Route.get('login', 'AuthController.loginPage')
  Route.get('users', 'AuthController.listUsers')
  Route.get('update', 'AuthController.updateUser')
}).middleware('guest')
