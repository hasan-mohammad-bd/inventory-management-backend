const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
// schema design
const productSchema = mongoose.Schema({
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
/*     price: {
        type: Number, 
        required: true,
        min: [0, 'Price cant be negative']
    }, */
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
    }]
    ,
    category: {
        type: String,
        // required: true,

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


/*     quantity: {
        type: Number, 
        required: true, 
        min: [0, 'quantity cant be negative'],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true
                }
                else {
                    return false 
                }
            }
        }      
        , message: 'Quantity must be an integer'
    },
     */
/*     status: {
        type: String, 
        required: true,
        enum: {
            values: ['in-stack', 'out-of-stack', 'discontinued']
        },
        

    }, */
/*     createAt: {
        type: Date, 
        default: data.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }, */
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    categories: [{
        name: {
            type: String,
            required: true
        },
        _id: mongoose.Schema.Types.ObjectId,
    }]



})



//middleware for saving data: pre/post

productSchema.pre('save', function(next){
    if(this.quantity == 0){
        this.status = 'out-of-stack'
    }
    console.log('before saving data');
    next();
})

productSchema.post('save', function(doc, next){
    console.log('After saving data');
    next();
})

//instance
productSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}`);
}


//model
const Product = mongoose.model('Product', productSchema)


module.exports = Product;