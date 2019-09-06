'use strict'

const Config = use('Adonis/Src/Config')

class BitBucketService {
  constructor() {
    this.bitBucketSDK = use('BitBucketSDK')

    this.targetUsername = Config.get('bitbucket.targetUsername')
  }

  async getRepositories() {
    let params = {
      username: this.targetUsername,
      pagelen: 50,
      role: 'contributor'
    }

    const data = await this.bitBucketSDK.repositories.list(params)

    if (data.data.size === 0) {
      return [];
    }

    return data.data.values
  }

  async getReleaseTrainPullRequests(repoSlug) {
    const productionBranchPrefix = Config.get('bitbucket.productionBranchPrefix');
    const query = `destination.branch.name = "${productionBranchPrefix}"`

    let params = {
      username: this.targetUsername,
      pagelen: 50,
      state: 'OPEN',
      repo_slug: repoSlug,
      q: query
    }

    const data = await this.bitBucketSDK.pullrequests.list(params)

    if (data.data.size === 0) {
      return null;
    }

    return data.data.values
  }
}

module.exports = BitBucketService
