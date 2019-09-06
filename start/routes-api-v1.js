'use strict'

/*
|--------------------------------------------------------------------------
| API Routes (V1)
|--------------------------------------------------------------------------
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.resource('/repositories', 'RepositoryController')

  Route.resource('/repositories/:repo_slug/release-train-pull-requests', 'ReleaseTrainPullRequestController')

}).prefix('api/v1')
