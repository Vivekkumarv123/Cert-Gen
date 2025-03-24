import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
})

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema)
