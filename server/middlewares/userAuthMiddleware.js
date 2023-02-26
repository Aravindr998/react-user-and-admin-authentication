const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
  const accessToken = req.headers['x-auth-token']
  if(!accessToken){
    return res.status(401).json({verified: false})
  }
  try {
    const token = accessToken.split(' ')[1]
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    req.user = verified
    next()
  } catch (error) {
    console.log('error')
    res.status(400).json({verified: false})
  }
}

module.exports = {
  authenticateUser
}