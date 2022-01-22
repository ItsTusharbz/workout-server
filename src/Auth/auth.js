ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { encrypPassword } = require("../utils/util");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET || "secret";
opts.algorithms = "HS256";
const userController = require("../controller/userController");
const bcrypt = require("bcrypt");

//singup strategy
passport.use(
  "signup",
  new localStrategy(async (username, password, done) => {
    try {
      const userData = await userController.fetchUserByUsername(username);
      if (userData) {
        done("user already exists");
      } else {
        const hashPassword = await encrypPassword(password);
        const userToSave = {
          username,
          password: hashPassword,
        };
        const user = await userController.addUser(userToSave);
        done(null, user);
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  })
);

//login strategy
passport.use(
  "login",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await userController.fetchUserByUsername(username);
      try {
        if (!Object.entries(user).length) {
          return done(null, false, { message: "User not found" });
        }
        const validate = await bcrypt.compare(password, user.password);
        console.log(validate);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new JwtStrategy(opts, async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  })
);
