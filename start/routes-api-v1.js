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
  ).apiOnly()

  Route.resource(
    '/repositories/:repo_slug/release-train-pull-requests',
    'ReleaseTrainPullRequestController'
  ).apiOnly()

  Route.resource(
    '/repositories/:repo_slug/release-plane-pull-requests',
    'ReleasePlanePullRequestController'
  ).apiOnly()

}).prefix('api/v1')
