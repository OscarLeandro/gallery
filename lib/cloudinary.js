import axios from "axios";



const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;


export async function uploadImage(image, id, folder){
    const data = new FormData();
    
    console.log({image, folder})
    data.append('file', image);
    data.append('upload_preset', uploadPreset);
    data.append('cloud_name', cloudName);
    data.append('asset_folder',folder);
    data.append('public_id',id);
    for (const field of data.entries()) {
        console.log(field);
    }
    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,data
            );
        console.log('imagen subida',res)
        return res.data.url;
    } catch (error) {
        console.log(error);
        
    }

} 

