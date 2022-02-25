const Users = require('../auth/auth-model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

const usernameIsUnique = async ( req, res, next ) => {
  const username = req.body.username

  Users.findBy({username})
    .then(([res]) => {
      if(!res){
        next()
      } else {
        next({
          status: 400, message: "username taken" 
        })
      }
    }).catch(next)
}

const checkUsernameExists = async (req, res, next) => {
  const username = req.body.username

  Users.findBy({username})
    .then(([res]) => {
      if(!res){
        next({ 
          status: 400, message: "invalid credentials" 
        })
      } else {
        next()
      }
    }) .catch(next);
  }

const validateUser = (req,res,next)=>{
  if (!req.body.username|| !req.body.password){
    next({ 
      status: 400, message: "username and password required" 
    })
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

module.exports ={
  usernameIsUnique,
  checkUsernameExists,
  validateUser,
  generateToken,  
} 