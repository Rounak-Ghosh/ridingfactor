const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    //accountId can be Google Id, Facebook Id etc.
    accountId: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
    },
    photoURL: {
      type: String,
    },
    provider: {
      type: String,
    },
     isAdmin: {
       type: String,
    },
    // facebookId: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
