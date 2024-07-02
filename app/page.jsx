"use client";

import EventForm from "@/components/NewEventForm";

// import { useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// "next-cloudinary";
// import UploadImage from './api/upload'

export default function Home() {
  return (
    <div>
      <h1>Upload an Image</h1>
      <EventForm/>
    </div>
  );
}
