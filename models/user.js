let mongoose=require("mongoose");
let passportLocalMongoose=require("passport-local-mongoose");
let uniqueValidator = require('mongoose-unique-validator');
let UserSchema=new mongoose.Schema({
    
    email: {
        type: String,
        unique: true,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      username:{
        type: String,
        unique: true,
        required: true
      },
      password:{
        hash: String,
        salt: String
      }
      
});
UserSchema.plugin(uniqueValidator);
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);
