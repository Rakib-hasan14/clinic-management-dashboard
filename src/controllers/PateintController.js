const {
    successResponse,
    validationError,
    errorHandler,
    errorResponse,
} = require('../helpers/apiResponse');
const PateintModel = require('../models/PateintModel');

exports.addPateint = async(req, res) => {
    try{
        const {
            name,
            email,
            number,
            age,
            address,
            gender,
            accountStatus
        } = req.body

        const emailExist = await PateintModel.findOne({email: email})

        if(emailExist) return errorResponse(res,'Email already exist')

        const numberExist = await PateintModel.findOne({number: number})

        if(numberExist) return errorResponse(res,'Number already exist')

        const pateint = await PateintModel.create({
            name,
            email,
            number,
            age,
            address,
            gender,
            accountStatus
        })


        successResponse(res, {
            message: 'Successfully added pateint',
            data: pateint
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.getPateints = async(req, res) => {
    try{
        const {
            sorting,
            fromDate,
            toDate,
            searchKey,
            status
        } = req.query

        let config = {}
        let sortBy = {}

        if(status && ['active','pending','cancal'].includes(status)){
            config = {
                ...config,
                accountStatus: status
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



        const pateints = await PateintModel.find(config).populate('appontments').sort(sortBy)

        successResponse(res, {
            message: 'Successfully find',
            data: pateints
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.singlePateint = async(req, res) => {
    try{
        const { id } = req.query

        const pateint = await PateintModel.findById(id).populate('appontments')

        successResponse(res, {
            message: 'Successfully get',
            data: pateint
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.updatePateints = async (req, res) => {
    try{
        const {
            id, 
            name,
            email,
            number,
            age,
            address,
            gender,
            accountStatus
        } = req.body

        await PateintModel.updateOne(
            {_id: id},
            {
                id, 
                name,
                email,
                number,
                age,
                address,
                gender,
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

exports.deletePatients = async(req,res) => {
    try{
        const {id} = req.body

        const exist = await PateintModel.findById(id)
        
        if(!exist) return errorResponse(res, 'Pateint not found')

        await PateintModel.findByIdAndDelete(id)

        successResponse(res, {
            message: 'Successfully deleted'
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}