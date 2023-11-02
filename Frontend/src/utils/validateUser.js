import validator from 'validator'

export const validateUser = (user) => {
  const { fullName, email, password, passwordConfirm, isMember, isForgot } =
    user

  if (!email) {
    return 'All fields are required!'
  }

  const localAddress = email.split('@')[0]
  if (
    !(
      validator.isEmail(email) &&
      email.length <= 320 &&
      localAddress.length <= 64 &&
      email.length - localAddress.length - 1 <= 255
    )
  ) {
    return 'Email is not valid!'
  }

  if (isForgot) {
    return ''
  }

  if (!password || (!isMember && !fullName)) {
    return 'All fields are required!'
  }

  if (password.length < 7 || password.length > 17) {
    return 'Please input password in range 7 to 17!'
  }

  if (!isMember) {
    if (fullName.length > 70) {
      return 'Please input password in range 7 to 17!'
    }

    if (passwordConfirm !== password) {
      return 'Password confirmed is not like the password!'
    }
  }
  return ''
}
