import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});

const fileUploadonCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File Upload successfukky", response);
        if (response) {
            fs.unlinkSync(localFilePath);
        }
        return response;
    } catch (error) {
        // remove the local file from local server
        fs.unlinkSync(localFilePath);
    }
};

export { fileUploadonCloudinary };
