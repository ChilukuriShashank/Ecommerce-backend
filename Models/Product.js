import mongoose from 'mongoose';

const Productschema = new mongoose.Schema({
    images: {
        type: [String],
        default: []
    },
    name: {
        type: String,
        required: true
    },
    productid: {
        type: Number,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: [
            {
                size: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

Productschema.pre('save', async function(next) {
    if (this.isNew) {
        const lastProduct = await this.constructor.findOne().sort({ productid: -1 });
        this.productid = lastProduct ? lastProduct.productid + 1 : 1;
    }
    next();
});

const Product = mongoose.model('Product', Productschema);
export default Product;
