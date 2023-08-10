import path from 'path';
import multer from 'multer';

const upload = multer({
    dest:'/uploads',
    limits:{fileSize:5*1024*1024}, //max size 5 mb
    storage:multer.diskStorage({
        destination:'/uploads',
        filename:(_req,file,cb)=>{
            cb(null,file.originalname);
        }
    }),
    fileFilter:(_req,file,cb)=>{
        let ext = path.extname(file.originalname);        
        if(
            ext!==".jpg" &&
            ext!==".png" &&
            ext!==".webp" &&
            ext!==".jpeg" &&
            ext!==".mp4"
        ){
            cb(new Error(`Unsupported File Format type ${ext}`),false);
            return;
        }
        cb(null,true);
    },
});

export default upload;