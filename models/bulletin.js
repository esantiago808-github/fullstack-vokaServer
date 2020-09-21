const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bulletinSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    posted: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const Bulletin = mongoose.model('Bulletin', bulletinSchema);

module.exports = Bulletin;
