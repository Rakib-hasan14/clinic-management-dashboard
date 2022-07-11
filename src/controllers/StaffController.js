const {
    successResponse,
    validationError,
    errorHandler,
    errorResponse,
} = require('../helpers/apiResponse');
const UserModel = require('../models/UserModel');

exports.getStaffs = async (req, res) => {
    try{
        const {
            position,
            sorting,
            fromDate,
            toDate,
            searchKey
        } = req.query

        let config = {
            accountType: 'staff'
        }
        let sortBy = {}

        if(position && ['nurse','receptionist','other'].includes(position)){
            config = {
                ...config,
                staffPosition: position
            }
        }

        if(sorting){
            sortBy = {
                createdAt: sorting
            }
        }

        if(fromDate){
            config = {
                ...config,
                createdAt: {
                    $gt: moment(new Date(fromDate))
                },
            };
        }

        if(toDate){
            config = {
                ...config,
                createdAt: {
                    $lt: moment(toDate ? new Date(toDate) : new Date()).add(
                        1,
                        'days'
                    ),
                },
            };
        }

        if (searchKey) {
            const newQuery = searchKey.split(/[ ,]+/);
            const nameSearchQuery = newQuery.map(str => ({
                name: RegExp(str, 'i'),
            }));
            config = {
                ...config,
                $and: [
                    {
                        $or: [
                            { $and: nameSearchQuery },
                        ],
                    },
                ],
            };
        }



        const staff = await UserModel.find(config).sort(sortBy)

        successResponse(res, {
            message: 'Successfully find',
            data: staff
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.singleStaffs = async (req, res) => {
    try{
        const { id } = req.query

        const staff = await UserModel.findById(id)

        successResponse(res, {
            message: 'Successfully get',
            data: staff
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.updateStaffs = async (req, res) => {
    try{
        const {
            id,
            name,
            email,
            password,
            number,
            age,
            address,
            gender,
            staffPosition,
            status,
            roll,
            accountType,
            accountStatus
        } = req.body

        await UserModel.updateOne(
            {_id: id},
            {
                name,
                email,
                password,
                number,
                age,
                address,
                gender,
                staffPosition,
                status,
                roll,
                accountType,
                accountStatus
            }
        )

        successResponse(res, {
            message: 'Successfully updated'
        })

    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.deleteStaffs = async (req, res) => {
    try{
        const {id} = req.body

        const isExist = await UserModel.findById(id)

        if(!isExist) return errorResponse(res, 'Staff not found')

        await UserModel.findByIdAndDelete(id)

        successResponse(res, {
            message: 'Successfully Deleted'
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}