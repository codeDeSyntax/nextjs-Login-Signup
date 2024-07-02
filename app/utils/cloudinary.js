const uploadResponse = await axios.post(
  `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
  {
    file: data,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  }
);
