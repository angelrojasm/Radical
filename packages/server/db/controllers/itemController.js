const Item = require('../models/item')
require('express-fileupload')
const s3 = require('../../aws/controller/s3')

exports.createItem = async(req,res) => {
    try {
        await Item.create({fileName: req.body.fileName})
        res.send({error: false})
    } catch (e) {
        console.log(e)
        res.send({error: true, details: e})
    }
}

exports.getItem = async(req,res) => {
    try {
        let data = await Item.find()
        let temp = []
        for(const item of data) {
            let imgData = await s3.getFile(item.fileName)
            temp.push({
                imgData: imgData,
                imgMeta: item
            })
        }
        res.send({error: false, items: temp})
    } catch (e) {
        res.send({error: true, details: e})
    }
}