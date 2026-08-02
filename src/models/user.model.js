const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role:{
      type:String,
      enum:['admin', 'staff'],
      default:'staff'
    }
  },
  { timestamps: true }
);
userSchema.method.toJSON = function(){
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};
module.exports = mongoose.model('User', userSchema)