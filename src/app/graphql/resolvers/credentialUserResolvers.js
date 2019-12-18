const User = use('App/Models/User')

module.exports = {
  Mutation: {
    async createUser (_root, { username, email, password }) {
      const newUser = await User.create({ username, email, password })
      return newUser
    },

    async login (_root, { email, password }, { auth }) {
      try {
        const { token } = await auth.attempt(email, password)
        return token
      } catch (err) {
        if (err.message.includes('E_USER_NOT_FOUND')) {
          throw new Error('Invalid credentials')
        }
      }
    }
  }
}
