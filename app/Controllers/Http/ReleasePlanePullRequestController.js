'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BitBucketService = use('App/Services/BitBucketService')

/**
 * Resourceful controller for interacting with releaseplanepullrequests
 */
class ReleasePlanePullRequestController {
  constructor() {
    this.bitBucketService = new BitBucketService
  }

  /**
   * Show a list of all releaseplanepullrequests.
   * GET releaseplanepullrequests
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      let pullRequests = await this.bitBucketService.getReleasePlanePullRequests(request.params.repo_slug)
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
   * Render a form to be used for creating a new releaseplanepullrequest.
   * GET releaseplanepullrequests/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new releaseplanepullrequest.
   * POST releaseplanepullrequests
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      let branches = await this.bitBucketService.prepareReleasePlane(request.params.repo_slug)

      return {
        message: 'Loaded successfully',
        data: branches,
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
   * Display a single releaseplanepullrequest.
   * GET releaseplanepullrequests/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing releaseplanepullrequest.
   * GET releaseplanepullrequests/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update releaseplanepullrequest details.
   * PUT or PATCH releaseplanepullrequests/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id = params.id
    const repoSlug = params.repo_slug

    try {
      const data = await this.bitBucketService.releaseReleasePlane(repoSlug, id)

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
   * Delete a releaseplanepullrequest with id.
   * DELETE releaseplanepullrequests/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ReleasePlanePullRequestController
