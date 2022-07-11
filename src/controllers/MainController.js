const {
    successResponse,
    validationError,
    errorHandler,
    errorResponse,
} = require('../helpers/apiResponse');
const AccountModel = require('../models/AccountModel');
const BalanceModel = require('../models/BalanceModel');
const AppointmentModel = require('../models/AppointmentModel');
const UserModel = require('../models/UserModel');

exports.getMainAllInfo = async (req, res) => {
    try{

        
        const balance = await BalanceModel.find()
        const sendMoney = await AccountModel.find({deletedAt: null}).sort({createdAt: 'desc'}).populate('person')
        const appointment = await AppointmentModel.find()
        const doctors = await UserModel.find({accountType: 'doctor'})

        let totalBalance = 0
        let totalSend = 0

        for (const history of balance) {
            const total = history.fee + totalBalance

            totalBalance = total
        }
        for (const history of sendMoney) {
            const total = history.amount + totalSend
            totalSend = total
        }
        const finalBalance = totalBalance - totalSend

        const income = finalBalance / 40 * 100


        successResponse(res,{
            message: 'Successfully get',
            data: {
                balance: finalBalance,
                income: income,
                appointment: appointment.length,
                doctors: doctors.length,
                finance: sendMoney.slice(0,7),
                transactions: balance
            }
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}