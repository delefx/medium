import multer from 'multer'
import dotenv from 'dotenv'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import {v2 as cloudinary} from 'cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//cloudinary storage config
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
       const folder = file.fieldname === 'avatar' ?
        'teacher avatar'
        : file.fieldname === 'backCover'
         ? 'course avatar' 
        : file.fieldname === 'studentAvatar'
        ? 'student avatar'
        : 'default';
        const allowedFormats = file.mimetype.startsWith('video/') 
        ? ['mp4', 'avi', 'mov'] 
        : ['jpg', 'png', 'jpeg', 'gif', 'webp'];

        return{
            folder: folder,
            allowedFormats: allowedFormats,
            resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image'
        }
    }
})
//multer config
const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        console.log("file details:", file); 
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp','image/jpg', 'video/mp4', 'video/avi', 'video/mov'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images and videos are allowed.'));
            
        }
    },
    
}).fields([
    {name: 'avatar', maxCount: 1},
    {name: 'backCover', maxCount: 1},
    {name: 'studentAvatar', maxCount: 1},
    {name: 'images'}
])

//middleware to handle file upload
 export const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error("Multer error:", err);
            return res.status(400).json({error: err.message});
        }
        if (err) {
            console.error("Unknown error:", err);
            return res.status(500).json({error: 'An unknown error occurred during file upload.'});
        }
        //No errors, proceed to next middleware
        next();

    })
}

