const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  
  try{
    const token = req.headers.authorization ?
    req.headers.authorization.split(' ')[1] : '';

    if(token) {
      jwt.verify(token, secret, (error, decodedToken ) => {
        if (error) {
          res.status(401).json({message: "token required"})
        } else {
          req.decodedToken = decodedToken;
          next()
        }
      })
    } else{
     res.status(401).json({message: "token required"})
    }

  } catch(error) {
    res.status(500).json({message: "token invalid"})
  }
 

};

// *** may have to take res status out of next() call * 

 /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */