const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();



// Routes


//signup post response
router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // create the new user
    User.create(req.body, (err, user) => {
        //redirect to login page
        res.redirect("/user/login")
    })
})
//
//login post response
router.post("/login", (req, res) => {
  // get the data from the request body
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    // checking if userexists
    if (!user) {
      res.send("user doesn't exist");
    } else {
      //check if password matches
      const result = bcrypt.compareSync(password, user.password);
      if (result) {
        const userId = user._id
        console.log("userId " + userId);
        req.session.username = username
        req.session.loggedIn = true
        req.session.userId = userId
        res.redirect(`/recipes/${userId}`);
      } else {
        res.send("wrong password");
      }
    }
  });
});

router.get("/logout", (req, res) => {
  // destroy session and redirect to main page
  req.session.destroy((err) => {
      res.redirect("/")
  })
})




// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
  res.render("user/signup.ejs")
})

//router.post("/signup", (req, res) => {
//  res.send("signup")
//})

// The login Routes (Get => form, post => submit form)
//router.get("/login", (req, res) => {
//  res.render("user/login.ejs")
//})

//router.post("/login", (req, res) => {
//  res.send("login")
//})

//


//User
router.get("/login",(req,res) => { //
  res.render("./user/login.ejs")
})

//app.get("/user/signup",(req,res) => {
  
//  res.render("./user/signup.ejs")
//})


router.post("/login", (req, res) => {//
    //need to add logic to check if user exist in mongo. 
    // if they do redict to the users recipe/index
    // if they do not show error and request user to signup ????
    res.send("login")
  });

  



// Export the Router
module.exports = router;