const User = require('../mongoose/models/user')

exports.createUser = async(req,res) => {
    console.log(req.body)
    try {
        await User.create({
            userId: req.body.userId,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: '',
            street: '',
            city: '',
            sector: '',
            residency: ''
            
        })
        res.send({eror: false})
    }
    catch(e) {
        res.send({error: true, details: e})
    }
}

exports.getUser = async(req,res) => {
    let user = await User.findOne({userId: req.query.userId}) 
    user === null? res.send({error: true, content: user}): res.send({error: false, content: user})
}

exports.updateField = async(req,res) => {
    try {
        await User.updateOne({[req.body.field]: req.body.value})
        res.send({error: false})
    }
    catch(e) {
        res.send({error: true, details: e})
    }
}
