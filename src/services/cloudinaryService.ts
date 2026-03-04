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
  const result = await cloudinary.uploader.destroy(publicId);
  console.log("Resultado eliminación:", result);
  return result;
};

module.exports = {
  uploadToCloudinary,
  deleteImage,
};