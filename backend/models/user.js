const mongoose = require ('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


userSchema.pre('save' ,async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10)
    }
})

userSchema.methods.generateToken = async function(){
    let token = jwt.sign({ _id: this._id }, process.env.SECRATE);
    return token;
}

const User = mongoose.model ('User' , userSchema)

module.exports = User