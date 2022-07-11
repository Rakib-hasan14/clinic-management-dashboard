const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const BalanceSchema = new Schema(
    {
        fee: {
            type: Number
        },
        from: {
            type: ObjectId,
            ref:'users'
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('balance', BalanceSchema)