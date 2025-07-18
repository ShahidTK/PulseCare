import doctorModel from "../models/doctor.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import appointmentModel from "../models/appointment.model.js"


const changeAvailability = async (req, res) => {
    try{
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        console.log("doctor details: " , docData)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success: true, message: 'Availability Changed'})
    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// doctors list

const doctorList = async(req, res)=> {
    try{
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({success:  true, doctors})
    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API for doctor login
const loginDoctor = async (req, res) => {
    try{
        const {email, password} = req.body
        console.log(email)
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success: false, message: "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch){
            const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
            return res.json({success: true, token})
        }
        else{
            return res.json({success: false, message: 'Invalid credentials'})
        }
    } catch(error){
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

// API to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) =>{
    try{
        const {docId} = req
        const appointments = await appointmentModel.find({docId})

        return res.json({success: true, appointments})
        
    } catch(error){
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

// API to mark appointment completed for doctor panel

const appointmentComplete = async (req, res) => {
    try{
        const {appointmentId} = req.body;
        const {docId} = req;

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId == docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted : true})

            return res.json({success: true, message: "Appointment Completed"})
        } else{
            return res.json({success: false, message: "Mark Failed"})
        }
    } catch(error){
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

// API to mark appointment cancelled for doctor panel

const appointmentCancel = async (req, res) => {
    try{
        const {appointmentId} = req.body;
        const {docId} = req;

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId == docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled : true})

            return res.json({success: true, message: "Appointment Cancelled"})
        } else{
            return res.json({success: false, message: "Cancellation Failed"})
        }
    } catch(error){
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

// API to get dashboard data for doctors panel

const doctorDashboard = async (req, res) =>{
    try{
        const {docId} = req
        const appointments = await appointmentModel.find({docId})

        let earnings = 0

        appointments.map((item)=>{
            if(item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) =>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments : appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        return res.json({success: true, dashData})
        
    } catch(error){
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

// API to get doctor profile for Doctor panel

const doctorProfile = async (req, res) => {
    try{
        const {docId} = req;
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({success: true, profileData})
    } catch(error){
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

const updateDoctorProfile = async (req, res) => {
    try{
        const {docId} = req;
        const {fees, address, available} = req.body
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available});

        res.json({success: true, message: "Profile Updated"})
    } catch(error){
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

export {changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, updateDoctorProfile, doctorProfile}