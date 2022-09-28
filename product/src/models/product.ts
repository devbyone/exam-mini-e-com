import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

export { Product };