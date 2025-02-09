import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config.js";
import fs from "node:fs";

// configuring cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

// Upload an image
const uploadOnCloudinary = async (localFilePath, folderName) => {
  // if there is no local file path
  if (!localFilePath) {
    return null;
  }

  // main uploading
  const uploadResponse = await cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "auto",
      folder: folderName,
    })
    .catch(() => {
      fs.unlinkSync(localFilePath); // deletes the locally saved temporary file
      return null;
    });

  fs.unlinkSync(localFilePath); // deletes the locally saved temporary file
  return uploadResponse;
};

const deleteImageFromCloudinary = async (imageUrl) => {
  const publicId = imageUrl.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy(publicId);
};

export { uploadOnCloudinary, deleteImageFromCloudinary };
