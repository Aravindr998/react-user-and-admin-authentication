const jwt = require('jsonwebtoken')
const helpers = require('../utilities/userHelpers')
const userModel = require('../models/Users')
const bcrypt = require('bcrypt')


const registerUser = async (req, res) => {
  try { 
    console.log('entered')
    const { errors, isValid } = helpers.validateRegisterInput(req.body)
    if(!isValid) {
      console.log('not valid')
      return res.json(errors)
    }
    const existing = await userModel.findOne({email: req.body.email})
    if(existing) {
      console.log('existing')
      return res.json({error: 'Email already registered'})
    }else{
      console.log('saving')
      const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
      })
      await user.save()
      res.json({success: true})
    }
  } catch (error) {
    console.log(error)
  }
}

const loginUser = async (req, res) => {
  try {
    const { errors, isValid } = helpers.validateLoginInput(req.body)
    if(!isValid){
      return res.json(errors)
    }
    const user = await userModel.findOne({email: req.body.email})
    if(!user){
      return res.json({error: 'Email is not registered'})
    }
    const match = await bcrypt.compare(req.body.password, user.password)
    if(!match){
      return res.json({error: 'Incorrect password'})
    }
    const token = helpers.createToken(user)
    res.json({
      success: true,
      token: `Bearer ${token}`
    })

  } catch (error) {
    console.log(error)
  }
}

const homePage = (req, res) =>{
  res.json(req.body.user.name)
}

const userDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.user.id)
    res.json(user)
  } catch (error) {
    console.log(error)
  }
}

const getUserDetails = async(req, res) => {
  const id = req.user.id
  try {
    const user = await userModel.findById(id)
    res.json(user)
  } catch (error) {
    console.log(error)
  }
}
const saveImage = async(req, res) => {
  if(!req.file){
    return res.json({error: 'Image is required'})
  }
  const path = req.file.path.slice(7)
  const filepath = `http://localhost:4000/${path}`
  try {
    await userModel.findOneAndUpdate({_id: req.user.id}, {$set:{image: filepath}})
    res.json({success: true, url: filepath})
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
  homePage,
  userDetails,
  getUserDetails,
  saveImage
}