const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
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
        certified: {
            type: String,
        },
        image: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['male','female','other'],
            required: true
        },
        status: {
            type: String,
            enum: ['married','single'],
        },
        roll: {
            type: String,
            enum: ['admin','doctor','other'],
            required: true
        },
        accountStatus: {
            type: String,
            enum: ['active','pending','cancal'],
            required: true
        },
        staffPosition: {
            type: String,
            enum: ['nurse','receptionist','other']
        },
        category: {
            type: String,
        },
        fee: {
            type: Number
        },
        accountType: {
            type: String,
            enum: ['admin','doctor','staff'],
            required: true
        },
    },
    {
        timestamps: true
    }
)


UserSchema.pre('save', function (next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('users',UserSchema)