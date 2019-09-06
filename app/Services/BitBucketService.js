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
    const productionBranchPrefix = Config.get('bitbucket.productionBranchPrefix')
    const query = `destination.branch.name = "${productionBranchPrefix}" AND state = "OPEN"`

    let params = {
      username: this.targetUsername,
      pagelen: 50,
      repo_slug: repoSlug,
      q: query
    }

    const data = await this.bitBucketSDK.pullrequests.list(params)

    if (data.data.size === 0) {
      return null;
    }

    return data.data.values
  }

  async prepareReleaseTrain(repoSlug) {
    const productionBranch = Config.get('bitbucket.productionBranchPrefix')
    const releaseBranchNames = await this._getReleaseBranches(repoSlug)

    if (releaseBranchNames.length === 0) {
      throw new Error('Unable to find the release branch.')
    }

    // Choose the first branch as the release branch
    // TODO: Decide on how to know what the current release branch is.
    const releaseBranch = releaseBranchNames[0]

    let currentDateString = new Date().toJSON().slice(0, 10)

    let params = {
      "_body": {
        title: `Release Train - ${currentDateString}`,
        source:  {
          branch: {
            name: `${releaseBranch}`
          }
        },
        destination:  {
          branch: {
            name: `${productionBranch}`
          }
        }
      },
      "repo_slug": repoSlug,
      "username": this.targetUsername,
    };

    return await this.bitBucketSDK.repositories.createPullRequest(params)
  }

  async releaseReleaseTrain(repoSlug, pullRequestId) {
    return await this._mergePullRequest(repoSlug, pullRequestId)
  }

  async _getReleaseBranches(repoSlug) {
    const releaseBranchPrefix = Config.get('bitbucket.releaseBranchPrefix')
    const query = `name ~ "${releaseBranchPrefix}"`

    let params = {
      username: this.targetUsername,
      pagelen: 50,
      repo_slug: repoSlug,
      q: query
    }

    const data = await this.bitBucketSDK.repositories.listBranches(params)
    const branches = data.data.values

    return branches.map(branch => branch.name)
  }

  async _mergePullRequest(repoSlug, pullRequestId) {
    let params = {
      pull_request_id: pullRequestId,
      repo_slug: repoSlug,
      username: this.targetUsername,
    }

    return await this.bitBucketSDK.pullrequests.merge(params)
  }
}

module.exports = BitBucketService
