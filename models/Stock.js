const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
// schema design
const stackSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },
    name: {
        type: String, 
        required: [true, 'Please provide a name for this product.'],
        trim: true, 
        unique: [true, 'Name must be unique'], 
        minLength: [3, 'Name must be at least 3 characters'], 
        maxLength: [100, 'Name is too large']
    }, 
    description: {
        type: String, 
        required: true
    }, 

    unit: {
        type: String, 
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value must be {VALUE}, must be kg/liter/pcs/bag"
        }
    }
    , 
    imageURLs: [{
        type: String,
        required: true,
        validate: {
            validator: (value)=>{
                if(!Array.isArray(value)){
                    return false;
                }
                let isValid = true
                value.forEach(url =>{
                    if(!validator.isURL(url)){
                        isValid = false;
                    }
                })
                return isValid;

            },
            message: 'Please provide valid image urls'
        }
    }],
    price: {
        type: Number,
        required: true,
        min:[0, "Product price can't be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "product quantity can't be negative"]
    }
    ,
    category: {
        type: String,
        required: true,

    },
    brand : {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },

    status:{
        type: String,
        required: true,
        enum: {
            values: ["in-stack", "out-of-stack", "discontinued"],
            message: "Status can't be {VALUE}"
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, 'please provide a store name'],
            enum:{
                values: ['dhaka', 'chattogram','rajshahi', 'sylhet',],
                message: "{VALUE} is not a valid name"
            },
            lowercase: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true, 
            required: [true, 'Please provide a supplier name'],

        },
        id: {
            type: ObjectId,
            required: true,
            ref: 'Supplier'

        }
    }

},{
    timestamps: true
})





//model
const Stock = mongoose.model('Stock', stackSchema)


module.exports = Stock;