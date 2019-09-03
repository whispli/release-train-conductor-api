'use strict'

/*
|--------------------------------------------------------------------------
| API Routes (V1)
|--------------------------------------------------------------------------
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.resource('pull-requests', 'PullRequestController')

}).prefix('api/v1')
