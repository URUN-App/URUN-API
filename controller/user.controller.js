const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const controller = {};


//Getting all users
controller.getUsers = async(request, response) => {
    //default time limit and skip

    const {limit=5 , skip=0} = request.body;

    const query = { };

    //showing the total number of users and users that are active
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
          .populate("following", "name")
          .populate("followers", "name")
          .limit(Number(limit))
          .skip(Number(skip)),
      ]);

        // sending the response
    response.json({
        total,
        users,
    });


} 

// Updating an user
 controller.usersPut = async (req, res) => {
    // getting the id that was sent
    const { id } = req.params;
    // extracting values that we will not be able to update
    const { _id, password, email, ...info } = req.body;
  
    // validating password against db
    if (password) {
      const salt = bcrypt.genSaltSync();
      info.password = bcrypt.hashSync(password, salt);
    }
  
    // updating the user
    const userDB = await User.findByIdAndUpdate(id, info, { new: true });
  
    // returning the response
    res.json({
      msg: "User updated successfully",
      user: userDB,
    });
  };
  

//delete user
controller.usersDelete = async (req, res) => {
    //getting the id of the users we are going to delete
    const { id } = req.params;
  
    // changing the status of the user to false
    const user = await User.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
  
    // sending the response
    res.json({
      msg: "User deleted successfully",
      user,
    });
  };

// follow an user
controller.usersFollow = async (req, res) => {
    // getting the id of the user that wants to follow another user
    const { id } = req.params;
  
    // getting the id of the user that we are going to follow
    const { friend_id } = req.body;
  
    // getting the user and the friend from the db
    const user = await User.findById(id);
    const friendExist = await User.findById(friend_id);
  
    // checking if the user exists
    if (!user) {
      res.status(404).json({
        msg: "User not found",
      });
    }
  
    // checking if the friend exists
    if (!friendExist) {
      return res.status(400).json({
        msg: "The user you are trying to add doesn't exist",
      });
    }
  
    // checking if the users wants to follow himself
    if (id === friend_id) {
      return res.status(400).json({
        msg: "You can't follow yourself",
      });
    }
  
    // checking if the user is already following the friend
    if (user.following.includes(friend_id) && user) {
      return res.status(400).json({
        msg: "You are already follow this user",
      });
    }
  
    // checking if the users that we want to follow is not active
    if (!friendExist.status) {
      return res.status(400).json({
        msg: "The user you are trying to add is not active",
      });
    }
  
    // adding to the user following the friend
    user.following.push(friend_id);
  
    // adding to the friend followers the user
    friendExist.followers.push(id);
  
    // saving the changes in db
    await friendExist.save();
    await user.save();
  
    // sending the response
    res.json({
      msg: "Friend added successfully",
      user,
    });
  };

  controller.usersGetOne = async (req, res) => {
    // getting the id of the user that we are going to get
    const { id } = req.params;
  
    // getting the user from the db and populating the following and followers
    const user = await User.findById(id)
      .populate("following", "name")
      .populate("followers", "name");
  
    // sending the response
    res.json({
      user,
    });
  };

module.exports = controller;

