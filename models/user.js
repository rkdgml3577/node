const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})


userSchema.pre('save', function( next ){
    var User = this;

    if(User.isModified('password')){
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(User.password,salt, function(err, hash){
                if(err) return next(err)
                User.password = hash
                next()
            })
        })

    }

})

const user = mongoose.model('user', userSchema)

module.exports ={user}