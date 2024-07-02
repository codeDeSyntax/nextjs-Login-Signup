"use client"
import { useState } from "react";
import Image from 'next/image'

const ImageUpload = () => {
  const[image, setImage] = useState("");
  const[loaded,setLoaded] = useState(false)

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ajtnfsri");

    const res = await fetch(
     `https://api.cloudinary.com/v1_1/dc1gzptza/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setImage(data.secure_url);
    setLoaded(true)
    // setImage(URL.createObjectURL(file));
  };


  return (
    <div>
    
      <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage}/>
      {
        !loaded && <p className="animate-spin">🚫</p>
      }
      {image && <Image src={image} alt="Ima" className='h-[20vh] w-[20vw]' height={60} width={70}/>}
    </div>
  );

}
export default ImageUpload;