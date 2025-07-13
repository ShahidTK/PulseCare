import express from 'express'

import { addDoctor, loginAdmin, allDoctors } from '../controllers/admin.controller.js'
import authAdmin from '../middleware/authAdmin.js'
import upload from '../middleware/multer.js'
import { changeAvailability } from '../controllers/doctor.controller.js'

const adminRouter = express.Router()
adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin, allDoctors)
adminRouter.post('/change-availability',authAdmin, changeAvailability)

export default adminRouter