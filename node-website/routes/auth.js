var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');
const validator = require("email-validator");
const User = require("../models/User.js");

const bcrypt = require('bcrypt');
const saltRounds = 12;

const nodemailerCred = require('../config/nodemailercred.js'); //Don't forget to create this file

function sendEmail(email){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: nodemailerCred.email,
          pass: nodemailerCred.password
        }
      });
      
      const mailOptions = {
        from: nodemailerCred.email,
        to: email,
        subject: 'FinalProject website account registration',
        text: "Hello \nPlease give me a 12"
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/login', (req, res) => {
    const { username, password} = req.body;

    if(username && password){
        try{
            User.query().select('username').where('username',username).then(async foundUser => {
                if(foundUser.length == 0) {
                    return res.redirect("/login?error"); //USER NOT FOUND
                } else{
                    const matchingPassword = await User.query().select('password').where({'username': username});
                    const passwordToValidate = matchingPassword[0].password;

                    bcrypt.compare(password, passwordToValidate).then((result) => {
                        if(result){
                            req.session.user = username;
                            return res.redirect("/account");
                        } else{
                            return res.redirect("/login?error"); //WRONG PASSWORD
                        }
                    });
                }
            });
        }
        catch (error) {
            return res.redirect("/login?error"); //Something wrong with DB
        }
    }
    else {
        return res.redirect("/login?error");
    }

});

router.post('/signup', (req, res) => {
    const {username, email, password, passwordRepeat} = req.body;

    const isPasswordTheSame = password === passwordRepeat;

    if (username && password && isPasswordTheSame && email) {
        //password validation
        if(password.length < 8) {
            return res.status(400).send({ response: "Password must be 8 or more characters longer"});
        } else if(!validator.validate(email)){
            return res.status(400).send({ response: "Email not valid"});
        }
            else {
                try {
                    User.query().select('username').where('username', username).then(foundUser => {
                        if (foundUser.length > 0) {
                            return res.redirect("/signup?error"); //Username already used
                        } else {
                            bcrypt.hash(password, saltRounds).then(hashedPassword => {
                                User.query().insert({
                                    username,
                                    email,
                                    password: hashedPassword
                                }).then(createdUser => {
                                    sendEmail(email);
                                    req.session.user = username;
                                    return res.redirect('/account')
                                })
                            })
                        }
                    })
                } catch (error) {
                    return res.status(500).send({ response : "Something went wrong with the Database"});
                }
            }
    } else if (password && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({ response: "Passwords do not match"});
    } else {
        return res.status(400).send({ response: "Missing fields: username, password, passwordRepeat"});
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {})
    return res.redirect('/login');
});

module.exports = router;