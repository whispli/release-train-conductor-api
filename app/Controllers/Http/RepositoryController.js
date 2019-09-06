'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BitBucketService = use('App/Services/BitBucketService')

/**
 * Resourceful controller for interacting with repositories
 */
class RepositoryController {
  constructor() {
    this.bitBucketService = new BitBucketService
  }

  /**
   * Show a list of all repositories.
   * GET repositories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const repositories = await this.bitBucketService.getRepositories()
      return {
        message: 'Loaded successfully',
        data: repositories,
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
   * Render a form to be used for creating a new repository.
   * GET repositories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new repository.
   * POST repositories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single repository.
   * GET repositories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing repository.
   * GET repositories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update repository details.
   * PUT or PATCH repositories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a repository with id.
   * DELETE repositories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RepositoryController
