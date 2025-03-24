import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Certificate from '@/models/Certificate';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    // ✅ Connect to MongoDB
    await dbConnect();

    const { recipientName, courseName, internshipType, date } = await req.json();

    if (!recipientName || !courseName || !internshipType || !date) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // ✅ Set default admin ID
    const defaultCreatedBy = new mongoose.Types.ObjectId("67dff29fdbdd5c602bef83ff");

    const certificateId = uuidv4();

    // ✅ Create certificate
    const certificate = new Certificate({
      certificateId,
      recipientName,
      courseName,
      internshipType,
      date,
      createdBy: defaultCreatedBy,
    });

    await certificate.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Certificate created successfully',
        certificate,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json(
      { message: 'Failed to create certificate' },
      { status: 500 }
    );
  }
}
