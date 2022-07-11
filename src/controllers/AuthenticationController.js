const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    successResponse,
    validationError,
    errorHandler,
    errorResponse,
} = require('../helpers/apiResponse');
const UserModel = require('../models/UserModel');

exports.createUsers = async(req, res) => {
    try{
        const {
            name,
            email,
            password,
            number,
            age,
            address,
            certified,
            gender,
            status,
            fee,
            roll,
            staffPosition,
            accountType,
            category,
            accountStatus
        } = req.body

        const emailExist = await UserModel.findOne({email: email})

        if(emailExist) return errorResponse(res,'Email already exist')

        const numberExist = await UserModel.findOne({number: number})

        if(numberExist) return errorResponse(res,'Number already exist')

        const user = await UserModel.create({
            name,
            email,
            password,
            number,
            age,
            address,
            certified,
            gender,
            fee,
            status,
            roll,
            staffPosition,
            accountType,
            category,
            accountStatus: 'active'
        })

        successResponse(res,{
            message: 'Successfully created',
            data: user
        })

    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.signIn = async (req, res)=> {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            validationError(res, 'Email or password is required');
        }

        const user = await UserModel.findOne({
            email: email,
            deletedAt: null,
        }).select('-createdAt -updatedAt');

        if (!user) {
            return errorResponse(
                res,
                'user not found . please sign up first'
            );
        }

        const matchPassword = bcrypt.compareSync(password, user.password);

        if (!matchPassword) {
            return errorResponse(res, 'Wrong password.');
        }

        const jwtData = {
            userId: user._id,
            name: user.name,
        };


        const token = jwt.sign(
            jwtData,
            process.env.JWT_PRIVATE_KEY,
            {}
        );

        delete user._doc.password;
        delete user._doc._id;

        successResponse(res, {
            message: 'Login Success.',
            data: {
                user: {
                    token,
                    ...user._doc,
                },
            },
        });
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.getProfile = async (req, res)=> {
    try{
        const id = req.userId

        const user = await UserModel.findById(id).select('-password -_id')

        if(!user) return errorResponse(res, 'User not found')

        successResponse(res, {
            message: 'Get Profile',
            data: {
                user
            }
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.updateProfile = async (req, res) => {
    try{
        const id = req.userId
        const {
            name,
            email,
            number,
            age,
            address,
            certified,
            photo,
            gender,
            status,
        } = req.body

        const exist = await UserModel.findById(id)

        if(!exist) return errorResponse(res, 'Not found user')

        await UserModel.updateOne(
                {_id: id},
                {
                    name,
                    email,
                    number,
                    age,
                    address,
                    certified,
                    gender,
                    status,
                    photo,
                }
            ) 

        successResponse(res, {
            message: 'Updated Successfully'
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}