import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationLinkSent: { type: Boolean, default: false },
    avatarLink: { type: String },
  },
  { timestamps: true }
);

// Method to generate authentication token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    },
    process.env.JWTPRIVATEKEY,
    { expiresIn: '7d' }
  );
  return token;
};

// Create the User model
const User = mongoose.model('User', userSchema);

// Validation function for registration
const validateRegister = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });
  return schema.validate(data);
};

// Validation function for login
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });
  return schema.validate(data);
};

// Export the User model and validation functions
export { User, validateRegister, validateLogin };
