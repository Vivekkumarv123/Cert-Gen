import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    certificateId: { type: String, unique: true, required: true },
    recipientName: { type: String, required: true },
    courseName: { type: String, required: true },
    internshipType: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);

export default Certificate;
