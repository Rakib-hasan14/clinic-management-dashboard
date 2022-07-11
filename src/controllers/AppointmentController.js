const {
    successResponse,
    validationError,
    errorHandler,
    errorResponse,
} = require('../helpers/apiResponse');
const AppointmentModel = require('../models/AppointmentModel');
const UserModel = require('../models/UserModel');
const PateintModel = require('../models/PateintModel');
const BalanceModel = require('../models/BalanceModel');
const moment = require('moment');


exports.getCategory = async (req, res) => {
    try{
        const category = await UserModel.distinct('category')

        successResponse(res, {
            message: 'Successfully get',
            data: category 
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.addAppointment = async(req, res) => {
    try{
        const {
            category,
            doctor,
            pateint,
            status,
        } = req.body

        const appointment = await AppointmentModel.create(
            {
                category,
                doctor,
                pateint,
                status,
            }
        )
        const id = appointment._id
         await PateintModel.updateOne(
            {_id: pateint},
            {
                $push: { appontments: appointment._id },
            }
         )

            successResponse(res, {
                message: 'Successfully Appoint',
            })


    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.getAppointments = async(req, res) => {
    try{
        const {
            category,
            doctor,
            date,
            status,
        } = req.query

        let config = {}

        if(category) {
            config = {
                ...config,
                category
            }
        }

        if(doctor) {
            config = {
                ...config,
                doctor
            }
        }

        if(date) {
            config = {
                ...config,
                date:  moment(new Date(date)),
            }
        }

        if(status) {
            config = {
                ...config,
                status
            }
        }
        

        const appointments = await AppointmentModel.find(config).populate('doctor pateint').sort({createdAt: 'desc'})
        
        successResponse(res, {
            message: 'Successfully Get',
            data: appointments
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}

exports.makeDone = async(req, res) => {
    try{
        const {id} = req.query

        const exist = await AppointmentModel.findById(id).populate('doctor pateint')

        if(!exist) return errorResponse(res, 'not found Appointment')

        await AppointmentModel.updateOne(
            {_id: id},
            {
                isDone: true
            }
        )
            console.log(exist.doctor.fee , exist.pateint._id)

        const payment = await BalanceModel.create({
            fee: exist.doctor.fee,
            pateint: exist.pateint._id
        })

        successResponse(res, {
            message:'Successfully make done',
        })
    }catch(error){
        errorResponse(res, error.message)
    }
}