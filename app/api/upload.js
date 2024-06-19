import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { data } = await req.json();
    const uploadResponse = await axios.post(
      `https://api.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        file: data,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      }
    );
    return NextResponse.json({ url: uploadResponse.data.secure_url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
