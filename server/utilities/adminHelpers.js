const Validator = require('validator')
const isEmpty = require('is-empty')
const jwt = require('jsonwebtoken')

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
    id: user._id
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY)
  return token
}
const validateUpdate = (data) => {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''

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

  return{
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = {
  validateLoginInput,
  createToken,
  validateUpdate
}