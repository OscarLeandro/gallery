import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const InputFile = () => {
  const [croppedImage, setCroppedImage] = useState('');
  const [image, setImage] = useState(null);
  const cropperRef = useRef(null);

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(e.starget.files[0]);
    }
  };

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (cropper !== undefined) {
      const canvas = cropper.getCroppedCanvas();
      const croppedImage = canvas.toDataURL('image/png');
      console.log(croppedImage);
    }
  };

  return (
    <>
    
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {image && (
        <Cropper
          style={{ borderRadius: '50%', overflow: 'hidden', width: '300px', height: '300px' }}
          viewMode={2}
          ref={cropperRef}
          src={image}
          aspectRatio={3}
          guides={false}
          crop={onCrop}
          rounded
        />
        
      )}
    </>
  );
};

export default InputFile;