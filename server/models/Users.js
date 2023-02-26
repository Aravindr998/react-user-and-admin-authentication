const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    index: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number cannot be empty']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty']
  },
  image: {
    type: String
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', async function(next){
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
    next()
  } catch (error) {
    console.log(error)
  }
})

userSchema.pre('find', function(){
  this.where({isDeleted: false})
})
userSchema.pre('findOne', function(){
  this.where({isDeleted: false})
})
userSchema.pre('findById', function(){
  this.where({isDeleted: false})
})
userSchema.pre('findOneAndUpdate', function(){
  this.where({isDeleted: false})
})

const User = mongoose.model('User', userSchema)
module.exports = User