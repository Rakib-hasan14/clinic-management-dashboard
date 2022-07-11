const {
    successResponse,
    validationError,
    errorHandler,
    errorResponse,
} = require('../helpers/apiResponse');
const UserModel = require('../models/UserModel');

exports.getDoctors = async (req, res) => {
    try{
        const {
            roll,
            accountStatus,
            sorting,
            fromDate,
            toDate,
            searchKey
        } = req.query

        let config = {
            accountType: 'doctor'
        }
        let sortBy = {}

        if(roll){
            config = {
                ...config,
                roll
            }
        }

        if(sorting){
            sortBy = {
                createdAt: sorting
            }
        }

        if(accountStatus){
            config = {
                ...config,
                accountStatus
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



        const doctors = await UserModel.find(config).sort(sortBy)

        successResponse(res, {
            message: 'Successfully find',
            data: doctors
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.singleDoctors = async (req, res) => {
    try{
        const { id } = req.query

        const doctor = await UserModel.findById(id)

        successResponse(res, {
            message: 'Successfully get',
            data: doctor
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.updateDoctor = async (req, res) => {
    try{
        const {
            id,
            name,
            email,
            password,
            number,
            age,
            address,
            certified,
            gender,
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
                certified,
                gender,
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

exports.deleteDoctor = async (req, res) => {
    try{
        const {id} = req.body

        const isExist = await UserModel.findById(id)

        if(!isExist) return errorResponse(res, 'Doctor not found')

        await UserModel.findByIdAndDelete(id)

        successResponse(res, {
            message: 'Successfully Deleted'
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}