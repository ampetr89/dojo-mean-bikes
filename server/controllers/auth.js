const User = require('mongoose').model('User');
const errorHandler = require('./error-handler');

//localhost/auth/login?email=amp87@gmail.com&password=pw
module.exports = {
  login(req, res){
    
    
    User.findOne({email: req.body.email}) 
        .then( user=> 
          {

            //console.log('found user in db', user);
            // note it's not an error if the user not found, just returns undefined. so we force it to throw an error
            if(user === null){ 
              res.status(401).json('Email/password combination not found.');
              return;
              //throw new Error('User not found')
            };
        
            // validatePassword is a static method, so we call it on the User *class*
            console.log('req.body.password',req.body.password);
            var valid_pw;
            User.validatePassword(
              req.body.password, user.password, 
              function(error, response){
                valid_pw = response;
                if(valid_pw){
                  user = completeLogin(req, res, user);
                  res.json(user);
                }else{
                  res.status(401).json('Email/password combination not found.')
                }
              });
            
          }).catch(() => {
            res.status(401).json('Email/password combination not found.')
          })
  },
  logout(req, res){
    console.log('logging out user')
    req.session.destroy();
    res.clearCookie('userID');
    res.clearCookie('expiration');

    res.json(true);

  },
  register(req, res){
    User.create(req.body)
        .then(user => {
           console.log('registerd a user!', user);
           user = completeLogin(req, res, user);
           res.json(user);
        })
        .catch(errorHandler.bind(res))
  },
  show(req, res){
    User.findById(req.params.id)
          .then(post => res.json(post))
          .catch(errorHandler.bind(res))
  }
}

function completeLogin(request, response, user){
  request.session.user = user.toObject();
  console.log('logging in user', request.session.user);
  delete request.session.user.password;

  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 864000*1000);
  //response.json(user);


  return user
}