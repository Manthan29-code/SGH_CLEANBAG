import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires:86400 //24 hours
  },
});

const BlackListToken = mongoose.model("BlackListToken", blackListTokenSchema);

export default BlackListToken;
