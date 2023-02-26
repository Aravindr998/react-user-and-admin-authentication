const Validator = require('validator')
const isEmpty = require('is-empty')
const jwt = require('jsonwebtoken')

const validateRegisterInput = (data) => {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ''

  if(Validator.isEmpty(data.name)){
    errors.error = 'User name is required'
  }
  else if(Validator.isEmpty(data.email)) {
    errors.error = 'Email is required'
  }else if(!Validator.isEmail(data.email)){
    errors.error = 'Email is invalid'
  }


  else if(Validator.isEmpty(data.phone)){
    errors.error = 'Phone number is required'
  }

  else if(Validator.isEmpty(data.password)){
    errors.error = 'Password is required'
  }

  else if(Validator.isEmpty(data.confirmPassword)){
    errors.error = 'Confirm password is required'
  }

  else if(!Validator.isLength(data.password, {min:3, max: 30})){
    errors.error = 'Password must be atleast 3 characters'
  }

  else if(!Validator.equals(data.password, data.confirmPassword)){
    errors.error = 'Password do not match'
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}

const validateLoginInput = (data) => {
  let errors = {}
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if(Validator.isEmpty(data.email)) {
    errors.error = 'Email is required'
  }else if(!Validator.isEmail(data.email)){
    errors.error = 'Email is invalid'
  }

  else if(Validator.isEmpty(data.password)){
    errors.error = 'Password is required'
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}

const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY)
  return token
}

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  createToken
}