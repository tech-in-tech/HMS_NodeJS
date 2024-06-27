// sets up Passport with a local authentication strategy, using a person model for user data. - Auth.js file

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person'); // Adjust the path as needed

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // console.log('Received credentials:', username, password);
        const user = await person.findOne({ username });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; // Export configured passport