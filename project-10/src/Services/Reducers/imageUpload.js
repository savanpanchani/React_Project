import axios from "axios";


export const uploadImage = async (data) => {
    let formData = new FormData();

    formData.append('file', data);
    formData.append('upload_preset', "blik_clone");
    formData.append('cloud_name', 'dvaqzaxpt');

    let res = await axios.post(`https://api.cloudinary.com/v1_1/dvaqzaxpt/image/upload`, formData)
    return res.data.secure_url;
}