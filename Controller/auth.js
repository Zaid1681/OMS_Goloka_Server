const User = require("../Schemas/User.js");
const bcrypt = require("bcryptjs");
const { createError } = require("../Utils/error.js");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    // i sended to the modeel User (collection with schema) and that model is responsible to create a collection and send the promise back
    await newUser.save(); //saved to the database
    console.log("user registered sucessfully!!");
    res.status(200).json(newUser); //sending response to the user
  } catch (error) {
    console.log("can't register ");
    next(error);
  }
};

//login  function
const login = async (req, res, next) => {
  // User is a collecton in the model
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(404, "User Not found"));
      console.log("plaese enter valid mail, passwordd");
    }
    // connected to the backend
    // it is used to add the comment in the background: ;
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(
        createError(400, "Wrong credentials pls login with proper credentials")
      );

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, //hash this info -> and verify it later
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc; //we are getting a data of a user trying to login and ._doc is a object which complete user details and we are destructruring it

    console.log("user login sucessfully :)");
    res
      .cookie(
        "acess_token",
        token,
        { httpOnly: true } //this does not allow any client to enter
      )
      .status(200)
      .json({ ...otherDetails });
    console.log("token : ", token);
  } catch (error) {
    console.log("got an eror");
    next(error);
  }
};
module.exports = { login, register };
