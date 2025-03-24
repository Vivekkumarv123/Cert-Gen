import dbConnect from '@/lib/db';
import Certificate from '@/models/Certificate';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    
    const { certificateId } = params;
    
    const certificate = await Certificate.findOne({ certificateId });
    
    if (!certificate) {
      return NextResponse.json(
        { message: 'Certificate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(certificate);
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
