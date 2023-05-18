const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;


const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true, 
        lowercase: true,
        minLength: [3, "Name must be 3 characteristics long"],
        mixLength: [100, "Name must be within 100 characteristics long"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true
    },
    brand: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },
    contactNumber: [{
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide valid phone number"
        }
    }],
    emergencyContactNumber: {
        type: String,
        required: [true, "Please provide a emergency contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide valid emergency phone number"
        }
    },
    tradeLicenseNumber: {
        type: Number,
        required: [true, "please provide your trade"]
    },
    presentAddress: {
        type: String,
        required: [true, "Please provide your present address"]
    },
    permanentAddress: {
        type: String,
        required: [true, "Please provide your permanent address"]
    },
    location: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "rajshahi", "chattogram", "sylet", "khulna","barishal", "rangpur"],
            message: "{VALUE} is not a correct division!",
        }
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid Image URL"]
    },
    nationalIdImageURL: {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    status: {
        type: String,
        default: "active",
        enum: {
            values: ["active", "in-active", "discontinue"],
            message: "Please provide a valid status"
        }

    },



},
{
    timestamps: true
})

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;