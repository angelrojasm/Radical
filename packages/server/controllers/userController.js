const User = require('../mongoose/models/user')

exports.createUser = async(req,res) => {
    try {
        await User.create({
            userId: req.body.userId,
            street: '',
            city: '',
            sector: '',
            residency: ''
            
        })
        res.status(200).send('ok')
    }
    catch(e) {
        res.send(e)
    }
}

exports.getUser = async(req,res) => {
    res.send(await User.find({userId: req.body.userId}))
}

exports.updateField = async(req,res) => {
    res.send(await User.updateOne({[req.body.field]: req.body.value}))
}
