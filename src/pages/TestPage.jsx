import React, { useState } from "react";
import onImageHandlers from "../components/ImageUploader";

function ImageToTextConverter() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedText, setConvertedText] = useState("");
  const [imageLoader, setImageLoader] = useState(false);
  const [file1, setFile1] = useState(null);
  const handleImageUpload = async (event) => {
    const image = await onImageHandlers(event, setImageLoader);
    setFile1(image);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
      {convertedText && <p>{convertedText}</p>}
      {file1 && <p>file name :{file1}</p>}
    </div>
  );
}

export default ImageToTextConverter;
