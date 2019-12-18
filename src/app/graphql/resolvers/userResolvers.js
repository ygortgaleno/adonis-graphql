const User = use('App/Models/User')

module.exports = {
  Query: {
    async allUsers() {
      const users = await User.all()
      return users.toJSON()
    },

    async fetchUsers(_, { id }) {
      const user = await User.find(id)
      return user.toJSON()
    }
  },
  Mutation: {
    async createUser(_, { username, email, password }) {
      const newUser = await User.create({username, email, password})
      return newUser
    },

    async editUser(_, { id, email, password }) {
      const user = await User.findOrFail(id)
      await user.merge({ email, password})
      await user.save()
      return user
    },

    async removeUser(_, { id }) {
      const user = await User.findOrFail(id)
      await user.delete()
      return true
    },

    async login(_, {email, password}, {auth}) {
      const {token} = await auth.attempt(email, password)
      return token;
    }
  }
}

