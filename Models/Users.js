const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const UserSchema = new Schema({
    id:{
        type: Number,
        required: [true, 'Id is required']
    },
    name: {
        type: String,
    },
    Image: {
        type: String,
    }
});

const User = mongoose.model('user',UserSchema);
module.exports = User;