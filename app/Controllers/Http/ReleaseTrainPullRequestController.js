'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BitBucketService = use('App/Services/BitBucketService')

/**
 * Resourceful controller for interacting with releasetrainpullrequests
 */
class ReleaseTrainPullRequestController {
  constructor() {
    this.bitBucketService = new BitBucketService
  }

  /**
   * Show a list of all releasetrainpullrequests.
   * GET releasetrainpullrequests
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      let pullRequests = await this.bitBucketService.getReleaseTrainPullRequests(request.params.repo_slug);
      return {
        message: 'Loaded successfully',
        data: pullRequests,
        error: null
      }
    } catch (err) {
      response.status(err.code)
      return {
        message: 'things did not go well...',
        data: [],
        error: err
      }
    }
  }

  /**
   * Render a form to be used for creating a new releasetrainpullrequest.
   * GET releasetrainpullrequests/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new releasetrainpullrequest.
   * POST releasetrainpullrequests
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      let branches = await this.bitBucketService.prepareReleaseTrain(request.params.repo_slug)

      return {
        message: 'Loaded successfully',
        data: branches,
        error: null
      }
    } catch (err) {
      console.log(err)
      response.status(err.code)
      return {
        message: 'things did not go well...',
        data: [],
        error: err
      }
    }
  }

  /**
   * Display a single releasetrainpullrequest.
   * GET releasetrainpullrequests/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing releasetrainpullrequest.
   * GET releasetrainpullrequests/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update releasetrainpullrequest details.
   * PUT or PATCH releasetrainpullrequests/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id = params.id
    const repoSlug = params.repo_slug

    try {
      const data = await this.bitBucketService.releaseReleaseTrain(repoSlug, id)

      return {
        message: 'Merged successfully',
        data: data,
        error: null
      }
    } catch (err) {
      response.status(err.code)
      return {
        message: 'things did not go well...',
        data: [],
        error: err
      }
    }
  }

  /**
   * Delete a releasetrainpullrequest with id.
   * DELETE releasetrainpullrequests/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ReleaseTrainPullRequestController
