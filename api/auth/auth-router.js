const router = require('express').Router();
const Users = require('../auth/auth-model')
const { BCRYPT_ROUNDS } = require('../middleware/restricted')
const bcrypt = require('bcryptjs')
const { checkUsernameExists, validateUser, usernameIsUnique, generateToken } = require('./auth-middleware');


router.post('/register', usernameIsUnique, validateUser, (req, res) => {
  let user = req.body
  user.password = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser)

    }).catch(error => {
      next(error)
    })
});

router.post('/login', validateUser, checkUsernameExists, (req, res) => {
  let { username, password } = req.body

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `welcome, ${user.username}`,
          token,
        })
      } else {
        next({ 
          status: 401, message: 'invalid Credentials' 
        })
      }
    })
});



module.exports = router;
