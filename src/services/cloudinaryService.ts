const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "lugares",    
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

module.exports = { uploadToCloudinary };