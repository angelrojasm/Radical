const Likes = require('../models/likes')
const LikesItem = require('../models/likesItem')
const Item = require('../models/item')

exports.createLikes = async(req,res) => {
    try {
        await Likes.create({
            userId: req.body.userId,
        })
        res.send({eror: false})
    }
    catch(e) {
        res.send({error: true, details: e})
    }
}

exports.getLikes = async(req,res) => {
    let likes = await Likes.findOne({userId: req.query.userId}) 
    if(likes === null) {
        res.send({error: true, content: likes})
    }
        else {
            let likesItems = await LikesItem.find({likesId: likes._id})
            if(likesItems === null) {
                res.send({error: true, content: likesItems})
            }
            else {
                let items = []
                for(const element of likesItems) {
                    let itemEntry = await Item.findById(element.itemId)
                    let imgData = await s3.getFile(itemEntry.fileName)
                    items.push({
                        imgData: imgData,
                        imgMeta: itemEntry
                    })
                };
                res.send({error: false, content: items})
            }
        }
}


exports.addItemToLikes = async(req,res) => {
    let likes = await Likes.findOne({userId: req.body.userId}) 
    if(likes === null) {
        res.send({error: true, content: likes})
    }
        else {
            try {
                await LikesItem.create({
                   itemId: req.body.itemId,
                   likesId: likes._id
                })
                res.send({eror: false})
            }
            catch(e) {
                res.send({error: true, details: e})
            }
        }
}

exports.removeItemFromLikes = async(req,res) => {
    let likes = await Likes.findOne({userId: req.body.userId}) 
    if(likes === null) {
        res.send({error: true, content: likes})
    }
        else {
            try {
                await LikesItem.deleteOne({
                   itemId: req.body.itemId,
                   likesId: likes._id
                })
                res.send({eror: false})
            }
            catch(e) {
                res.send({error: true, details: e})
            }
        }
}