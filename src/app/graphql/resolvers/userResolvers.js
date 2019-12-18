const User = use('App/Models/User')

const authorizeAndReturnUser = async (auth) => {
  try {
    await auth.check()
    const user = await auth.getUser()
    return user
  } catch(err) {
    if(err.message.includes('E_INVALID_JWT_TOKEN')) {
      throw new Error('Missing or invalid jwt token')
    }
  }
}

const verifyEmailIsInUse = async(email) => {
  try {
    await User.findByOrFail('email', email)
    return true
  } catch (err) {
    return false
  }
}

const verifyUndefinedValues = (updateObject) => {
  const valuesAllowed = {}
  Object.keys(updateObject).map(key => {
    if(updateObject[key] !== undefined) {
      valuesAllowed[key] = updateObject[key]
    }
  })
  return valuesAllowed
}

module.exports = {
  Query: {
    async fetchUser(_root, _args, { auth }) {
      const user = await authorizeAndReturnUser(auth)
      return user.toJSON()
    }
  },

  Mutation: {
    async editUser(_root, { email, password }, { auth }) {
      const user = await authorizeAndReturnUser(auth)
      const verifyEmail = await verifyEmailIsInUse(email)

      if(verifyEmail) {
        throw new Error('Email already in use')
      }

      const updateAllowedValues = verifyUndefinedValues({ email, password })

      await user.merge(updateAllowedValues)
      await user.save()
      return user
    },

    async removeUser(_root, { password }, { auth }) {
      const user = await authorizeAndReturnUser(auth)

      try {
        await auth.attempt(user.email, password)
      } catch(err) {
        throw new Error('Your password doesnt match')
      }

      await user.delete()
      return true
    }
  }
}

