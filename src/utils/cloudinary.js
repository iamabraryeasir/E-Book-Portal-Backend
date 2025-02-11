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
const uploadOnCloudinary = async (
  localFilePath,
  folderName,
  resourceType = "auto"
) => {
  // if there is no local file path
  if (!localFilePath) {
    return null;
  }

  // main uploading
  const uploadResponse = await cloudinary.uploader
    .upload(localFilePath, {
      resource_type: resourceType,
      folder: folderName,
    })
    .catch(() => {
      fs.unlinkSync(localFilePath); // deletes the locally saved temporary file
      return null;
    });

  fs.unlinkSync(localFilePath); // deletes the locally saved temporary file
  return uploadResponse;
};

const deleteImageFromCloudinary = async (imageUrl, withExtension = false) => {
  let publicId = "";

  if (withExtension) {
    // for raw pdf's
    publicId = imageUrl.split("/").slice(-2).join("/");
  } else {
    // for images
    publicId = imageUrl.split("/").slice(-2).join("/").split(".").at(0);
  }

  const options = {
    resource_type: withExtension ? "raw" : "image",
  };

  await cloudinary.uploader.destroy(publicId, options);
};

export { uploadOnCloudinary, deleteImageFromCloudinary };
