import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // firstName: { type: String, required: true },
  // lastName: { type: String, required: true },
  // city: { type: String },
});

// module.exports = {
//   Users: mongoose.model("Users", userschema),
// };

const Users = mongoose.model("User", userSchema, "Users");

export default Users; // Default export
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  region: {
    id: { type: String, required: false },
    regCode: { type: String, required: false },
    regDesc: { type: String, required: false },
    value: { type: String, required: false },
    label: { type: String, required: false },
  },
  province: {
    id: { type: String, required: false },
    provCode: { type: String, required: false },
    provDesc: { type: String, required: false },
    regCode: { type: String, required: false },
    value: { type: String, required: false },
    label: { type: String, required: false },
  },
  municipality: {
    id: { type: String, required: false },
    citymunCode: { type: String, required: false },
    citymunDesc: { type: String, required: false },
    provCode: { type: String, required: false },
    regCode: { type: String, required: false },
    value: { type: String, required: false },
    label: { type: String, required: false },
  },
  barangay: {
    id: { type: String, required: false },
    brgyCode: { type: String, required: false },
    brgyDesc: { type: String, required: false },
    citymunCode: { type: String, required: false },
    provCode: { type: String, required: false },
    regCode: { type: String, required: false },
    value: { type: String, required: false },
    label: { type: String, required: false },
  },
  address: { type: String, required: true },
  cNumber: { type: String, required: true },
  birthday: { type: String, required: true },
  dataPrivacy: { type: Bson, required: true },
});
