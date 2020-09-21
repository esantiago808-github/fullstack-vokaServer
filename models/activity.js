const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    days: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    fee: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;