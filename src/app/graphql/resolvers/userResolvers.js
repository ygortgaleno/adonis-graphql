const User = use('App/Models/User')

const verifyEmailIsInUse = async (email) => {
  try {
    await User.findByOrFail('email', email)
    return true
  } catch (err) {
    return false
  }
}

const verifyUndefinedValues = (updateObject) => {
  const definedValues = {}
  Object.keys(updateObject).map(key => {
    if (updateObject[key] !== undefined) {
      definedValues[key] = updateObject[key]
    }
  })
  return definedValues
}

module.exports = {
  Query: {
    async fetchUser (_root, _args, { auth }) {
      const user = await auth.getUser()
      return user.toJSON()
    }
  },

  Mutation: {
    async editUser (_root, { email, password }, { auth }) {
      const user = await auth.getUser()
      const verifyEmail = await verifyEmailIsInUse(email)

      if (verifyEmail) {
        throw new Error('Email already in use')
      }

      const updateDefinedValues = verifyUndefinedValues({ email, password })

      await user.merge(updateDefinedValues)
      await user.save()
      return user
    },

    async removeUser (_root, { password }, { auth }) {
      const user = await auth.getUser()

      try {
        await auth.attempt(user.email, password)
      } catch (err) {
        throw new Error('Your password doesnt match')
      }

      await user.delete()
      return true
    }
  }
}
