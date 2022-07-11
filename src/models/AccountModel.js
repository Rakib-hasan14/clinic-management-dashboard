const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const AccountSchema = new Schema(
    {
        note: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        person: {
            type: ObjectId,
            ref: 'users'
        },
        amount: {
            type: Number,
            required: true
        },
        deletedAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('accounts',AccountSchema)