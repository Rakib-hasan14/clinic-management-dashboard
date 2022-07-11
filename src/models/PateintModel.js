const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const PateintSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
        number: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
        },
        address: {
            type: String,
        },
        appontments: [
            {
                type: ObjectId,
                ref: 'appointments',
            },
        ],
        gender: {
            type: String,
            enum: ['male','female','other'],
            required: true
        },
        accountStatus: {
            type: String,
            enum: ['active','pending','cancal'],
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('pateints' , PateintSchema)