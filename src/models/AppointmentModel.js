const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const AppointmentSchema = new Schema(
    {
        category: {
            type: String,
        },
        doctor: {
            type: ObjectId,
            ref: 'users',
        },
        pateint: {
            type: ObjectId,
            ref: 'pateints'
        },
        status: {
            type: String,
            required: true
        },
        isDone: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            default: new Date(),
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('appointments',AppointmentSchema)