import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'profile_pics',
      allowed_formats: ['jpg', 'png'],
      public_id: `${Date.now()}-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

export default upload;
