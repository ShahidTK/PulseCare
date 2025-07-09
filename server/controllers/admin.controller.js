import validator from "validator"
import bcrypt, { hash } from "bcrypt"
import cloudinary from "cloudinary"
import doctorModel from "../models/doctor.model.js"
// API for adding doctor 

const addDoctor = async (req, res)=> {
    try{
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;

        const imageFile = req.file

        // checking for all data to add doctor
        if(!name || !email || !password 
            || !speciality || !degree || !experience || !about || !fees 
        ){
            return res.json({success: false, message: "Missing details"})
        } 
        
        if(!address){
            return res.json({success: false, message: "no address found"})
        }
        
        // validating email format
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please Enter a valid Email"})
        }

        // validating strong password
        if(password.length < 8){
            return res.json({success: false, message: "Please enter a strong password"})
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        // upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resourse_type:"image"})
        const imageurl = imageUpload.secure_url;
        
        const doctorData = {
            name, 
            email, 
            image: imageurl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message:"Doctor added"})
    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


export {addDoctor}