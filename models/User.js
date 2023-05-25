const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            validate: [validator.isEmail, "provide a valid email"],
            trim: true,
            lowercase: true,
            required: [true, "email address is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: (value) => 
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowerCase: 3,
                    minNumber: 1,
                    minUpperCase:1,
                    minSymbols:1
                }),
                message: "Password {VALUE} is required"  
            }
        },
        confirmPassword: {
            type: String,
            required: [true, 'Please confirm your password'],
            validator: {
                validator: function(value){
                    return value === this.password;
                },
                message: "Password don't match!"
            }
        },
        role: {
            type: String,
            enum: ["buyer", "store-manager", "admin"],
            default: "buyer"
        },
        firstName: {
            type:String,
            required: [true, "please provide a first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"]
        },
        lastName: {
            type: String,
            trim: true,
            minLength: [3, "name must be at least 3 characters."],
            maxLength: [100, "Name is too large"]
        },
        contactNumber: {
            type: String,
            validate: [validator.isMobilePhone, "Please provide a valid contact number"]
        },
        shippingAddress: {
            type: String,
        },
        
        imageURL: {
            type: String,
            validate: [validator.isURL, "Please provide a valid url"],

        },
        status: {
            type: String,
            default: "active",
            enum: ["active", "inactive", "blocked"]
        },

        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date

    },
    {
        timestamps: true
    }

)


userSchema.pre('save', function(next) {
  const password = this.password;
  const saltRounds = 10; // Number of salt rounds to use for hashing

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
  });
});


const User = mongoose.model("User", userSchema);

module.exports = User;