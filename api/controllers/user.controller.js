const bcrypt = require('bcrypt')
const User = require('../models/user.model')

const createUser = async (req, res) => {
    console.log(req.body)
     // password is encrypted
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    // user is created
    const newUser = new User(req.body)
    await newUser.save((err, user) => {
      if(err) return res.status(400).send({ err, message: 'User not created!' })
      
      return res.status(200).json({ user })
    })
 
}

const getUsers = async (req, res) => {
  try {
    await User.find({}, (err, user) => {
      if (err) return res.status(400).json({ success: false, error: err })

      return res.status(200).json({ success: true, data: movies })
    })
  } catch (error) {
    res.status(500).send({error, message: 'Users not found!'})
  }
}

module.exports = { createUser, getUsers }