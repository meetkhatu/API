const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
})

const APISchema = new mongoose.Schema({
    list:{
        type: [ProductSchema],
        required: true
    },
    total_val:{
        type: Number,
        required: true
    }
})

const collection = mongoose.model('Bills', APISchema)
module.exports = collection