import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (fileBuffer: any, folderName: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folderName,    
          format: "webp",      
          quality: "auto",    
        },
        (error: any, result: unknown) => {
          if (error) return reject(error);
          resolve(result);      
        }
      )
      .end(fileBuffer);       
  });
};

const deleteImage = async (publicId: any) => {
  const result = await cloudinary.uploader.destroy(publicId);
  console.log("Resultado eliminación:", result);
  return result;
};

export { uploadToCloudinary, deleteImage};