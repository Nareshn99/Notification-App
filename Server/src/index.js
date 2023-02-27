const express = require('express');
const route = require('./routes/route');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')
const passport = require('passport');
const googleAuth = require("passport-google-oauth").OAuth2Strategy;


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Priyanka19:G8reXRlHUbBX65ev@plutonium01.9fxu8wj.mongodb.net/AuthMethods", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use(session({
    secret: "narws key",
    resave: false,
    saveUninitialized: true
}))

passport.use(new googleAuth({
    clientID: "928451941082-17178r1vb4thnvrbr05v5hjb9v617mmh.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    function (accessToken, refrenceToken, profile, done) {
        console.log(profile)
        return done(null, profile)
    }
))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

app.use(passport.initialize());
app.use(passport.session());


app.get("/auth/google",
    passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"] })
)

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" },
        function (req, res) {
            res.redirect("/")
        }
    )
)


app.use('/', route)


app.listen(5000, () => {
    console.log(`Express app running on port>>>>>>>  ${5000}`)
});
