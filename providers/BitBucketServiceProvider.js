'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class BitBucketServiceProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('BitBucketSDK', (app) => {
      /** @type {import('@adonisjs/framework/src/Config')} */
      const Config = this.app.use('Adonis/Src/Config')

      const BitBucket = app.use('bitbucket')

      let config = {
        baseUrl: Config.get('bitbucket.baseUrl'),
        headers: {},
        options: {
          timeout: Config.get('bitbucket.timeout') * 1000
        }
      }

      const authConfig = Config.get(
        'bitbucket.auth.' + Config.get('bitbucket.auth.type'),
        null
      );

      if (authConfig === null) {
        throw new Error('Please set BITBUCKET_AUTH_TYPE.')
      }

      this.bitBucketSDK = new BitBucket(config)
      this.bitBucketSDK.authenticate(authConfig)

      return this.bitBucketSDK
    })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    //
  }
}

module.exports = BitBucketServiceProvider
