const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    aadharCardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin' , 'voter'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save' , async function() {
    const user = this;
    if(!user.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password , salt);
        user.password = hashedPassword;
    } catch (err) {
        throw err;
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword , this.password);
        return isMatch;
    } catch (err) {
        console.error('Password comparison error:', err);
        throw new Error('Password verification failed');
    }
}

const User = mongoose.model('User',userSchema);
module.exports = User; 