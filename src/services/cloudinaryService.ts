const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folderName,    
          format: "webp",      
          quality: "auto",    
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);      
        }
      )
      .end(fileBuffer);       
  });
};

const deleteImage = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadToCloudinary,
  deleteImage,
};