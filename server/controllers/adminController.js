const adminModel = require('../models/Admin')
const helpers = require('../utilities/adminHelpers')
const userModel = require('../models/Users')

const loginAdmin = async (req, res) => {
  try {
    const { errors, isValid } = helpers.validateLoginInput(req.body)
    if(!isValid){
      return res.json(errors)
    }
    const admin = await adminModel.findOne({email: req.body.email})
    if(!admin){
      return res.json({error: 'Email is not registered'})
    }
    if(req.body.password != admin.password){
      return res.json({error: 'Incorrect password'})
    }
    const token = helpers.createToken(admin)
    res.json({
      success: true,
      token: `Bearer ${token}`
    })
  } catch (error) {
    console.log(error)
  }
}
const getUserDetails = async (req, res) => {
  try {
    const users = await userModel.find()
    res.json({users})
  } catch (error) {
      console.log(error)
  }
}
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body
    console.log(id)
    const user = await userModel.findOneAndUpdate({_id: id}, {$set: {isDeleted: true}})
    console.log(user)
    res.json({success: true})
  } catch (error) {
    console.log(error)
  }
}
const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userModel.findById(id)
    if(user){
      res.json(user)
    }else{
      res.json({redirect: true})
    }
  } catch (error) {
    console.log(error)
  }
}
const updateUser = async(req, res) => {
  try {
    const { errors, isValid } = helpers.validateUpdate(req.body)
    if(!isValid){
      return res.json(errors)
    }
    const { id } = req.params
    const user = await userModel.findById(id)
    if(user.email != req.body.email){
      const existing = await userModel.findOne({email: req.body.email})
      if(existing){
        return res.json({error: 'User with given email already exists'})
      }
    }
    if(req.file){
      console.log('got file')
      const path = req.file.path.slice(7)
      const filepath = `http://localhost:4000/${path}`
      await userModel.findOneAndUpdate({_id: id}, {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone, image: filepath}})
    }else{
      await userModel.findOneAndUpdate({_id: id}, {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}})
    }
    res.json({success: true})
  } catch (error) {
    console.log(error)
  }
}
const searchUser = async(req, res) => {
  try {
    const searchKey = req.body.search
    const users = await userModel.find({$or: [{name: new RegExp(searchKey, 'i')}, {email: new RegExp(searchKey, 'i')}]})
    console.log(users)
    res.json(users)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  loginAdmin,
  getUserDetails,
  deleteUser,
  getUser,
  updateUser,
  searchUser
}