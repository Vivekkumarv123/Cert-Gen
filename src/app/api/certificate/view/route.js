import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Certificate from '@/models/Certificate';

export async function GET() {
  await dbConnect();

  try {
    const certificates = await Certificate.find({});
    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
