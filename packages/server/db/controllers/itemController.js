const Item = require('../models/item')
require('express-fileupload')

exports.createItem = async(req,res) => {
    try {
        
        let temp = new Buffer.from(req.files.image.data).toString('base64');
        let imgString = "data:image/png;base64," + temp
        await Item.create({image: imgString})
        res.send({error: false})
    } catch (e) {
        console.log(e)
        res.send({error: true, details: e})
    }
}

exports.getItem = async(req,res) => {
    try {
        let data = await Item.find()
        res.send({error: false, images: data})
    } catch (e) {
        res.send({error: true, details: e})
    }
}