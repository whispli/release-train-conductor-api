'use strict'

/*
|--------------------------------------------------------------------------
| API Routes (V1)
|--------------------------------------------------------------------------
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.resource(
    '/repositories',
    'RepositoryController'
  )
    .apiOnly()
    .middleware(['auth'])

  Route.resource(
    '/repositories/:repo_slug/release-train-pull-requests',
    'ReleaseTrainPullRequestController'
  )
    .apiOnly()
    .middleware(['auth'])

  Route.resource(
    '/repositories/:repo_slug/release-plane-pull-requests',
    'ReleasePlanePullRequestController'
  )
    .apiOnly()
    .middleware(['auth'])

}).prefix('api/v1')

Route.post('register', 'Auth/RegisterController.register')
  .as('register')
  .prefix('api/v1');

Route.post('login', 'Auth/RegisterController.login')
  .as('login')
  .prefix('api/v1');

Route.post('logout', 'Auth/RegisterController.logout')
  .as('logout')
  .prefix('api/v1');
