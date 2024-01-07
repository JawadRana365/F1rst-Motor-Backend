const glob = require('glob'),
    Sequelize = require('sequelize'),
    path = require('path'),
    Logger = require("./logger.winston"),
    root = path.normalize(__dirname + '/../');
const passport = require('passport');

const LocalStrategy   = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
       User.findOne({ username: 'email' }, function (err, user) {
      
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    } catch (error) {
      return done(error, false);
      
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
  try {
const user = await User.findById(id);
done(null, user);
  } catch (error) {
    done(error, false);
  }
})