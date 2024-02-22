import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const collections = 'users'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name:String,
    email: {
        type: String,
        unique: true
    },
    age:Number,
    password:{
        type: String,
        set: (rawPass) => {
            const saltRounds = 10
            return bcrypt.hashSync(rawPass, saltRounds)
        }
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    role: {
        type: String,
        default: 'user'
    }
})

userSchema.methods.comparePassword = function(candidatePass) {
    return bcrypt.compareSync(candidatePass, this.password)
}

const UserModel = mongoose.model(collections, userSchema)

export default UserModel;