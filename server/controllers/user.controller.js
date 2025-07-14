import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary' 
import doctorModel from '../models/doctor.model.js'
import appointmentModel from '../models/appointment.model.js'

// API to register user
const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.json({success: false, message: "Missing Details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Enter a valid Email Id"})
        }

        if(password.length < 8){
            return res.json({success: false, message: "Enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, 
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET )

        res.json({success: true, token})
    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }   
}


// loginUser 

const loginUser = async (req, res)=> {
    try{

        const {email, password} = req.body;
        
        const user = await userModel.findOne({email})

        if(!user) {
        res.json({success: false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else{
            res.json({success: false, message: "Invalid credentials"});
        }

    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API to get the user profile data
const getProfile = async (req, res)=>{
    try{
        const {userId} = req
        const userData = await userModel.findById(userId).select('-password')
        res.json({success: true, userData})

    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API to update user profie

const updateProfile = async (req, res) => {
    try{
        const { name, phone, address, dob, gender}  = req.body;
        const {userId} = req;
        const ImageFile = req.file;
        if(!name || !phone || !gender || !dob){
        res.json({success: false, message: "Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})
        
        if(ImageFile){
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(ImageFile.path, {resource_type: 'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image: imageUrl})
        }

        res.json({success: true, message: "Profile Updated"})

    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API to book appointment

const bookAppointment = async (req, res) =>{
    try{
        const {docId, slotDate, slotTime } = req.body 
        const {userId} = req;
        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success: false, message: "Doctor not available"})
        }

        let slots_Booked = docData.slots_Booked

        // checking for slot availability

        if(slots_Booked[slotDate]){
            if(slots_Booked[slotDate].includes(slotTime)){
                return res.json({success: false, message: "Slot not available"});
            } else{
                slots_Booked[slotDate].push(slotTime)
            }
        } else{
            slots_Booked[slotDate] = []
            slots_Booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_Booked

        const appointmentData = {
            userId, 
            docId,
            userData, 
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, {slots_Booked})

        res.json({success: true, message: "Appointment Booked"})
    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API to get user appointments for frontend my-appointments page

const listAppointment = async(req, res)=>{
    try{
        const {userId} = req
        const appointments = await appointmentModel.find({userId})
        res.json({success: true, appointments})
    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment}