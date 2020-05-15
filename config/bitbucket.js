'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  baseUrl: Env.get('BITBUCKET_BASE_URL', 'https://api.bitbucket.org/2.0'),
  timeout: Env.get('BITBUCKET_TIMEOUT', 60),
  auth: {
    type: Env.get('BITBUCKET_AUTH_TYPE', 'apppassword'),
    token: {
      type: 'token',
      token: Env.get('BITBUCKET_TOKEN', ''),
    },
    apppassword: {
      type: 'apppassword',
      username: Env.get('BITBUCKET_USERNAME', ''),
      password: Env.get('BITBUCKET_PASSWORD', '')
    },
    basic: {
      type: 'basic',
      username: Env.get('BITBUCKET_USERNAME', ''),
      password: Env.get('BITBUCKET_PASSWORD', '')
    }
  },
  targetUsername: Env.get('BITBUCKET_TARGET_USERNAME', ''),
  releaseBranch: Env.get('RELEASE_BRANCH','release'),
  productionBranch: Env.get('PRODUCTION_BRANCH', 'master'),
  productionBranchPrefix: Env.get('PRODUCTION_BRANCH_PREFIX','master-'),

  // Todo: Remove this environment variable and give the app state using a DB
  targetRepositories: Env.get('BITBUCKET_TARGET_REPOSITORIES_CSV', ''),
}
