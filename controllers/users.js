const User = require("../models/user");

module.exports.renderSignup = (req,res)=> {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
        let{username , email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", `Welcome ${username} :) You're Signed In to WanderLust`);
            res.redirect("/listings");
        });
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome back to WanderLust! You've logged in successfully.");
    let redirectURL = res.locals.redirectUrl || "/listings";
    console.log(redirectURL);
    res.redirect(redirectURL);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success", "You've logged out successfully!");
        res.redirect("/listings");
    })
};