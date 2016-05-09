var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');
var fbConfig = require('../fb.js');

module.exports = function(passport) {
    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
        callbackURL     : fbConfig.callbackUrl,
        profileFields   : ['emails', 'first_name', 'last_name']
    },
    
    function(access_token, refresh_token, profile, done) {
        
        console.log('profile', profile);
        
        process.nextTick(function() {
            
        User.findOne({ 'id' : profile.id}, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, user);
            } else { 
                var newUser = new User();
                
                newUser.id = profile.id;
                newUser.access_token = access_token;
                newUser.firstname = profile.name.givenName;
                newUser.lastName = profile.name.familyName;
                newUser.email = profile.email[0].value;
                
                newUser.save(function(err) { 
                    if (err)
                        throw err;
                        
                    return done(null, newUser);
                });
               }
              });
            });
       }));
    };
    