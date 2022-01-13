Dashboard:
=================================

Web application / Dashboard in node Js.
 
# Installation
- Install Java  
- Install npm  
- npm i --save-dev nodemon  
- npm i --save express express-session passport passport-google-oauth2  
- Install node Js  
- Install Docker  


# Getting Started

Starting with connecting login Screen:

```
Register to access Dashboard  (Password should be at least 6 characters)  
If already register, then Login  

You can also register with your google account
```

# Adding Register restrictions

```js
router.post('/register', (req, res) => {
    const {name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    //Check password match
    if(password !== password2) {
        errors.push({ msg: 'Password do not match' });
    }

    // Check password lenght
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        res.send('pass');
    }

});
```

# Connecting Databse

Create a cluster in MongoDB, then paste the code as follows:

```js
module.exports = {
    MongoURI: 'mongodb+srv://HS-tek:<password>@clusterdashboard.8mjlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}
```

# Web Authentication
Create ID Oauth2 on Google API platform  

```js
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback",
    passReqToCallback : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));
```

# Dashboard
Widgets:
- Meteo  
- Calendar  
- Time  
- Map  
- Crypto Currency  
- Stock Exchange  

## Run the application  with npm :

```
$ npm run dev
```
## Run the application with Docker :

```
$ docker-compose build
$ docker-compose up
```

Or with Express :  
```
$ docker build -t express .
$ docker run -p 8080:8080 express
```


Robert Harakaly : robert.harakaly@epitech.eu  
Hugo Suzanne    : hugo.suzanne@epitech.eu  