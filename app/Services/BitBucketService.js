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

    return this.bitBucketSDK.repositories.list(params)
  }
}

module.exports = BitBucketService
