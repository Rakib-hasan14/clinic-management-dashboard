const {
    successResponse,
    validationError,
    errorHandler,
    errorResponse,
} = require('../helpers/apiResponse');
const AccountModel = require('../models/AccountModel');
const BalanceModel = require('../models/BalanceModel');

exports.sendMoney = async (req, res) => {
    try{
        const {
            note,
            type,
            person,
            amount,
        } = req.body

        const sendInfo = await AccountModel.create({
            note,
            type,
            person,
            amount,
        })


        successResponse(res, {
            message: 'Successfully send',
            data: sendInfo
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.getTransactions = async (req, res) => {
    try{
        const transactions = await AccountModel.find({deletedAt: null}).populate('person').sort({createdAt: 'desc'})
        
        successResponse(res, {
            message: 'Successfully get',
            data: transactions
        })
    }catch(error){
        errorResponse(res,error.message)
    }
}

exports.singleTransactions = async (req, res)=> {
    try{
        const {id} = req.query

        const transaction = await AccountModel.findById(id).populate('person')

        successResponse(res, {
            message: 'Successfully get',
            data: transaction
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.deleteTransactions = async(req,res) => {
    try{
        const {id} = req.body

        const exist = await AccountModel.findById(id)

        if(!exist) return errorResponse(res,'No transaction found')

        await AccountModel.updateOne(
            {_id: id},
            {
                deletedAt: new Date()
            }
        )

        successResponse(res, {
            message: 'successfully deleted'
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}