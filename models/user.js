let mongoose=require("mongoose");
let passportLocalMongoose=require("passport-local-mongoose");

let UserSchema=new mongoose.Schema({
    // username:String,
    // password:String,
    // email:String,
    // name:String
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

UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);
