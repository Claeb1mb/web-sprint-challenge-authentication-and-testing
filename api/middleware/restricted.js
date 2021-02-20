const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  
  try{
    const token = req.headers.authorization ?
    req.headers.authorization.split(' ')[1] : '';

    if(token) {
      jwt.verify(token, secret, (error, decodedToken ) => {
        if (error) {
          next({ apiCode: 401, message: "token required"})
        } else {
          req.decodedToken = decodedToken;
          next()
        }
      })
    } else{
      next({ apiCode: 401, message: "token required"})
    }

  } catch(error) {
    next({ apiCode: 500, errorMessage: "token invalid", ...error })
  }
 

};


 /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */