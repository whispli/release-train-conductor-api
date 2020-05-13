'use strict'

const {validateAll} = use('Validator')
const User = use('App/Models/User')

class RegisterController {
  async register({request, response}) {
    const validation = await validateAll(request.all(), {
      username: 'required|unique:users,username',
      email: 'required|unique:users,email',
      password: 'required',
    })

    if (validation.fails()) {
      response.status(422)
      return {
        message: "Validation failed",
      }
    }

    const user = await User.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password'),
    })

    response.status(201);

    return {
      message: "User created successfully."
    };

  }

  async login({request, auth, response}) {

    const {email, password} = request.all()

    const user  = await User.query().where('email', email).first()

    if (!user) {
      response.status(400)
      return {
        ok: false
      }
    }

    const jwt = await auth.attempt(user.email, password)
    return {
      data: jwt,
    }
  }

  async logout({auth}) {
    await auth.logout()
    return {
      ok: true,
    }
  }
}

module.exports = RegisterController
