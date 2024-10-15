const express = require('express')
const mongoose = require('mongoose')
const collection = require('./model')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Store')

app.post('/add', async (req, res) => {
    const list = req.body.list
    if (!Array.isArray(list) || !list.every(item => typeof item['name'] === 'string' && typeof item['quantity'] === 'number' && typeof item['price'] === 'number')) {
        return res.status(400).json({ "error": "List must follow the syntax [{\"name\":\"abc\",\"quantity\":2,\"price\":200},...]" })
    }
    let total_val = 0
    list.forEach(item => (
        total_val += item['quantity'] * item['price']
    ))
    console.log(total_val)
    try {
        const newEntry = await collection.create({
            list: list,
            total_val: total_val
        })
        return res.status(200).json({ "Total_Value": total_val });
    } catch (error) {
        return res.status(500).json({ "error": error + '\nFailed to save data to the database.' });
    }
})

app.listen(8000, () => {
    console.log("Server is Running")
})