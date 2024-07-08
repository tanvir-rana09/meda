import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/userModel.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import "dotenv/config"

passport.use(new LocalStrategy("local",
	{ usernameField: 'email' },
	async (email, password, done) => {

	  try {
		const user = await User.findOne({ email });
		if (!user) return done(null, false, { message: 'Incorrect email.' });
  
		const isMatch = await user.comparePassword(password);
		if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
  
		return done(null, user);
	  } catch (err) {
		return done(err);
	  }
	}
  ));
  
  // JWT Strategy
  const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET_KEY
  };
  
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
	try {
	  const user = await User.findById(jwt_payload.id);
	  if (user) {
		return done(null, user);
	  } else {
		return done(null, false);
	  }
	} catch (err) {
	  return done(err, false);
	}
  }));

  export default passport;